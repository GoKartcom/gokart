const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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

interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  isNewUser?: boolean;
  message?: string;
}

export const authService = {
  // Google Auth
  async handleGoogleAuth(credentialResponse: GoogleCredential): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      if (!response.ok) {
        return { success: false, message: `Server error: ${response.status}` };
      }

      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error("Google auth error:", error);
      return { success: false, message: "Failed to authenticate with Google" };
    }
  },

  // Send OTP
  async sendOTP(phone: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/phone/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, message: error.message || `Server error: ${response.status}` };
      }

      return await response.json();
    } catch (error) {
      console.error("Send OTP error:", error);
      return { success: false, message: "Failed to send OTP" };
    }
  },

  // Verify OTP
  async verifyOTP(phone: string, otp: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/phone/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, message: error.message || `Server error: ${response.status}` };
      }

      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error("Verify OTP error:", error);
      return { success: false, message: "Failed to verify OTP" };
    }
  },

  // Save Name
  async saveName(userId: string, name: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/phone/save-name`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, name }),
      });

      if (!response.ok) {
        return { success: false, message: `Server error: ${response.status}` };
      }

      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error("Save name error:", error);
      return { success: false, message: "Failed to save name" };
    }
  },

  logout(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem("authToken");
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem("authToken");
  },
};