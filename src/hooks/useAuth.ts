import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { toast } from "sonner";

interface GoogleCredential {
  credential: string;
}

interface User {
  id: string;
  email?: string;
  name: string;
  picture?: string;
  phone?: string;
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = authService.getToken();
    const storedUser = authService.getUser();
    
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  }, []);

  const loginWithGoogle = useCallback(
    async (credentialResponse: GoogleCredential) => {
      setIsLoading(true);
      try {
        const result = await authService.handleGoogleAuth(credentialResponse);

        if (result.success && result.token && result.user) {
          localStorage.setItem("authToken", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));
          
          setIsAuthenticated(true);
          setUser(result.user);
          
          toast.success("Successfully logged in!");
          setTimeout(() => {
            navigate("/");
          }, 500);
        } else {
          toast.error(result.message || "Failed to log in");
        }
      } catch (error) {
        toast.error("An error occurred during login");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  const sendOTP = useCallback(async (phone: string) => {
    setIsLoading(true);
    try {
      const result = await authService.sendOTP(phone);

      if (result.success) {
        toast.success("OTP sent to your phone number");
        return true;
      } else {
        toast.error(result.message || "Failed to send OTP");
        return false;
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyOTP = useCallback(
    async (phone: string, otp: string) => {
      setIsLoading(true);
      try {
        const result = await authService.verifyOTP(phone, otp);

        if (result.success && result.token && result.user) {
          localStorage.setItem("authToken", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));
          
          setIsAuthenticated(true);
          setUser(result.user);
          
          toast.success("Successfully logged in!");
          setTimeout(() => {
            navigate("/");
          }, 500);
        } else {
          toast.error(result.message || "Invalid OTP");
        }
        
        return result;
      } catch (error) {
        toast.error("An error occurred during verification");
        console.error(error);
        return { success: false, message: "An error occurred" };
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  }, [navigate]);

  return {
    isLoading,
    loginWithGoogle,
    sendOTP,
    verifyOTP,
    logout,
    isAuthenticated,
    user,
  };
}