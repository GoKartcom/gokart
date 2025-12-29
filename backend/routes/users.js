import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'klickit-secret-key-2024';

// ==================== MIDDLEWARE ====================

/**
 * Middleware to verify JWT token
 * Extracts user information from token and attaches to req.user
 */
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

/**
 * Validate location data
 */
const validateLocationData = (data, isUpdate = false) => {
  const errors = [];

  if (!isUpdate) {
    // Required fields for new location
    if (data.latitude === undefined || data.latitude === null) {
      errors.push('Latitude is required');
    }
    if (data.longitude === undefined || data.longitude === null) {
      errors.push('Longitude is required');
    }
    if (!data.label) {
      errors.push('Label is required');
    }
  }

  // Validate latitude range
  if (data.latitude !== undefined && (data.latitude < -90 || data.latitude > 90)) {
    errors.push('Latitude must be between -90 and 90');
  }

  // Validate longitude range
  if (data.longitude !== undefined && (data.longitude < -180 || data.longitude > 180)) {
    errors.push('Longitude must be between -180 and 180');
  }

  // Validate label enum
  if (data.label && !['Home', 'Work', 'Other'].includes(data.label)) {
    errors.push('Label must be one of: Home, Work, Other');
  }

  return errors;
};

// ==================== USER ENDPOINTS ====================

/**
 * GET /api/users/me
 * Get current user profile
 */
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        phone: user.phone,
        authMethod: user.authMethod,
        savedLocations: user.savedLocations,
        lastUsedLocation: user.lastUsedLocation
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error: error.message
    });
  }
});

/**
 * GET /api/users
 * Get all users (admin only - implement later)
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

/**
 * PUT /api/users/:id
 * Update user profile
 */
router.put('/:id', verifyToken, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, updatedAt: Date.now() },
      { new: true }
    );

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message
    });
  }
});

// ==================== LOCATION MANAGEMENT ENDPOINTS ====================

/**
 * POST /api/users/location/add
 * Add a new saved location
 * Max 5 locations per user
 */
router.post('/location/add', verifyToken, async (req, res) => {
  try {
    const { latitude, longitude, address, city, district, pincode, label, isDefault } = req.body;

    // Validate input
    const validationErrors = validateLocationData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    // Find user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check location limit
    if (user.savedLocations.length >= 5) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 5 saved locations allowed. Please delete one to add new.'
      });
    }

    // If isDefault is true, set all other locations' isDefault to false
    if (isDefault === true) {
      user.savedLocations.forEach(loc => {
        loc.isDefault = false;
      });
    }

    // If this is the first location and isDefault not specified, make it default
    const shouldBeDefault = isDefault === true || user.savedLocations.length === 0;

    // Create new location
    const newLocation = {
      latitude,
      longitude,
      address: address || '',
      city: city || '',
      district: district || '',
      pincode: pincode || '',
      label,
      isDefault: shouldBeDefault,
      createdAt: new Date()
    };

    user.savedLocations.push(newLocation);
    user.updatedAt = new Date();
    await user.save();

    // Get the newly added location
    const savedLocation = user.savedLocations[user.savedLocations.length - 1];

    res.status(201).json({
      success: true,
      message: 'Location added successfully',
      data: savedLocation
    });
  } catch (error) {
    console.error('Add location error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add location',
      error: error.message
    });
  }
});

/**
 * GET /api/users/locations
 * Get all saved locations of logged-in user
 * Sorted by isDefault (default first)
 */
router.get('/locations', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Sort locations: default first, then by creation date (newest first)
    const sortedLocations = [...user.savedLocations].sort((a, b) => {
      if (a.isDefault && !b.isDefault) return -1;
      if (!a.isDefault && b.isDefault) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.json({
      success: true,
      message: 'Locations retrieved successfully',
      data: sortedLocations
    });
  } catch (error) {
    console.error('Get locations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve locations',
      error: error.message
    });
  }
});

/**
 * PUT /api/users/location/:locationId
 * Update a specific location
 */
router.put('/location/:locationId', verifyToken, async (req, res) => {
  try {
    const { locationId } = req.params;
    const { latitude, longitude, address, city, district, pincode, label, isDefault } = req.body;

    // Validate input if provided
    const validationErrors = validateLocationData(req.body, true);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    // Find user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find location
    const location = user.savedLocations.id(locationId);
    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Location not found'
      });
    }

    // If isDefault is being set to true, unset all others
    if (isDefault === true) {
      user.savedLocations.forEach(loc => {
        if (loc._id.toString() !== locationId) {
          loc.isDefault = false;
        }
      });
    }

    // Update allowed fields only
    if (latitude !== undefined) location.latitude = latitude;
    if (longitude !== undefined) location.longitude = longitude;
    if (address !== undefined) location.address = address;
    if (city !== undefined) location.city = city;
    if (district !== undefined) location.district = district;
    if (pincode !== undefined) location.pincode = pincode;
    if (label !== undefined) location.label = label;
    if (isDefault !== undefined) location.isDefault = isDefault;

    user.updatedAt = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Location updated successfully',
      data: location
    });
  } catch (error) {
    console.error('Update location error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update location',
      error: error.message
    });
  }
});

/**
 * DELETE /api/users/location/:locationId
 * Delete a specific location
 * If deleted location was default, set first remaining location as default
 */
router.delete('/location/:locationId', verifyToken, async (req, res) => {
  try {
    const { locationId } = req.params;

    // Find user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find location
    const location = user.savedLocations.id(locationId);
    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Location not found'
      });
    }

    const wasDefault = location.isDefault;

    // Remove location
    location.deleteOne();

    // If deleted location was default and there are remaining locations,
    // set the first one as default
    if (wasDefault && user.savedLocations.length > 0) {
      user.savedLocations[0].isDefault = true;
    }

    user.updatedAt = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Location deleted successfully',
      data: {
        deletedLocationId: locationId,
        remainingLocationsCount: user.savedLocations.length
      }
    });
  } catch (error) {
    console.error('Delete location error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete location',
      error: error.message
    });
  }
});

/**
 * PATCH /api/users/location/:locationId/set-default
 * Set a location as default
 * Sets all other locations' isDefault to false
 */
router.patch('/location/:locationId/set-default', verifyToken, async (req, res) => {
  try {
    const { locationId } = req.params;

    // Find user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find location
    const location = user.savedLocations.id(locationId);
    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Location not found'
      });
    }

    // Set all locations' isDefault to false
    user.savedLocations.forEach(loc => {
      loc.isDefault = false;
    });

    // Set specified location as default
    location.isDefault = true;

    user.updatedAt = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Default location set successfully',
      data: location
    });
  } catch (error) {
    console.error('Set default location error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to set default location',
      error: error.message
    });
  }
});

/**
 * POST /api/users/location/last-used
 * Update last used location
 * Updates with current timestamp
 */
router.post('/location/last-used', verifyToken, async (req, res) => {
  try {
    const { latitude, longitude, city } = req.body;

    // Validate required fields
    if (latitude === undefined || latitude === null || longitude === undefined || longitude === null) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    // Validate ranges
    if (latitude < -90 || latitude > 90) {
      return res.status(400).json({
        success: false,
        message: 'Latitude must be between -90 and 90'
      });
    }

    if (longitude < -180 || longitude > 180) {
      return res.status(400).json({
        success: false,
        message: 'Longitude must be between -180 and 180'
      });
    }

    // Find user and update last used location
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.lastUsedLocation = {
      latitude,
      longitude,
      city: city || '',
      updatedAt: new Date()
    };

    user.updatedAt = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Last used location updated successfully',
      data: user.lastUsedLocation
    });
  } catch (error) {
    console.error('Update last used location error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update last used location',
      error: error.message
    });
  }
});

export default router;