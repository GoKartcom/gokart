import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { authService } from "@/services/authService";

interface User {
  id: string;
  email?: string;
  name: string;
  picture?: string;
  phone?: string;
}

interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  isNewUser?: boolean;
  message?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  logout: () => void;
  loginWithGoogle: (response: any) => Promise<void>;
  sendOTP: (phone: string) => Promise<boolean>;
  verifyOTP: (phone: string, otp: string) => Promise<AuthResponse>;
  setUserFromStorage: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = authService.getToken();
    const storedUser = authService.getUser();
    
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  }, []);

  const setUserFromStorage = () => {
    const token = authService.getToken();
    const storedUser = authService.getUser();
    
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  };

  const loginWithGoogle = async (credentialResponse: any) => {
    setIsLoading(true);
    try {
      const result = await authService.handleGoogleAuth(credentialResponse);

      if (result.success && result.token && result.user) {
        setIsAuthenticated(true);
        setUser(result.user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async (phone: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await authService.sendOTP(phone);
      return result.success;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (phone: string, otp: string): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const result = await authService.verifyOTP(phone, otp);

      if (result.success && result.token && result.user) {
        setIsAuthenticated(true);
        setUser(result.user);
      }

      return result;
    } catch (error) {
      console.error(error);
      return { success: false, message: "An error occurred" };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading, 
      user, 
      logout, 
      loginWithGoogle, 
      sendOTP, 
      verifyOTP,
      setUserFromStorage 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}