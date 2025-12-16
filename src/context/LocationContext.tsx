// src/context/LocationContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface Address {
  id: string;
  label: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

interface LocationContextType {
  currentAddress: Address | null;
  addresses: Address[];
  setCurrentAddress: (address: Address) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedAddresses = localStorage.getItem('addresses');
    const savedCurrent = localStorage.getItem('currentAddress');
    
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
    if (savedCurrent) {
      setCurrentAddress(JSON.parse(savedCurrent));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.setItem('addresses', JSON.stringify(addresses));
    }
  }, [addresses]);

  useEffect(() => {
    if (currentAddress) {
      localStorage.setItem('currentAddress', JSON.stringify(currentAddress));
    }
  }, [currentAddress]);

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...address,
      id: Date.now().toString(),
    };

    setAddresses((prev) => [...prev, newAddress]);

    // If it's the first address or marked as default, set it as current
    if (addresses.length === 0 || address.isDefault) {
      setCurrentAddress(newAddress);
    }

    toast.success('Address saved successfully');
  };

  const updateAddress = (id: string, updates: Partial<Address>) => {
    setAddresses((prev) =>
      prev.map((addr) =>
        addr.id === id ? { ...addr, ...updates } : addr
      )
    );

    if (currentAddress?.id === id) {
      setCurrentAddress((prev) => (prev ? { ...prev, ...updates } : null));
    }

    toast.success('Address updated successfully');
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));

    if (currentAddress?.id === id) {
      const remaining = addresses.filter((addr) => addr.id !== id);
      setCurrentAddress(remaining[0] || null);
    }

    toast.success('Address deleted successfully');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );

    const defaultAddr = addresses.find((addr) => addr.id === id);
    if (defaultAddr) {
      setCurrentAddress(defaultAddr);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        currentAddress,
        addresses,
        setCurrentAddress,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return context;
}