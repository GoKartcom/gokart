import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
  district: {
    type: String,
    default: '',
  },
  pincode: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    enum: ['Home', 'Work', 'Other'],
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const lastUsedLocationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  city: {
    type: String,
    default: '',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: false });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  name: {
    type: String,
    default: '',
  },
  picture: {
    type: String,
  },
  authMethod: {
    type: String,
    enum: ['google', 'phone', 'email'],
    required: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  savedLocations: {
    type: [locationSchema],
    default: [],
  },
  lastUsedLocation: {
    type: lastUsedLocationSchema,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model('User', userSchema);