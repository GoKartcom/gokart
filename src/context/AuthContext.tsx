import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

interface User {
  id: string;
  email?: string;
  name: string;
  picture?: string;
  phone?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithPhone: (phone: string) => Promise<{ success: boolean; message?: string }>;
  verifyPhoneOTP: (phone: string, token: string) => Promise<{ success: boolean; isNewUser?: boolean; message?: string }>;
  updateProfile: (name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapSupabaseUser(user: SupabaseUser | null): User | null {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name || user.user_metadata?.name || "",
    picture: user.user_metadata?.avatar_url || user.user_metadata?.picture,
    phone: user.phone,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Listen for auth state changes FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(mapSupabaseUser(session?.user ?? null));
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    // Then check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(mapSupabaseUser(session?.user ?? null));
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (error) {
        console.error("Google login error:", error);
      }
    } catch (error) {
      console.error("Google login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithPhone = async (phone: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone });
      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true, message: "OTP sent successfully" };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to send OTP" };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPhoneOTP = async (phone: string, token: string): Promise<{ success: boolean; isNewUser?: boolean; message?: string }> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: "sms",
      });
      if (error) {
        return { success: false, message: error.message };
      }
      // Check if user has a profile already
      const isNewUser = !data.user?.user_metadata?.full_name;
      return { success: true, isNewUser };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to verify OTP" };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (name: string) => {
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name },
    });
    if (error) throw error;
    // Update local state
    setUser((prev) => (prev ? { ...prev, name } : null));
    // Also upsert to profiles table
    if (session?.user) {
      await supabase.from("profiles").upsert({
        user_id: session.user.id,
        full_name: name,
        phone_number: session.user.phone || "",
      }, { onConflict: "user_id" });
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        session,
        logout,
        loginWithGoogle,
        loginWithPhone,
        verifyPhoneOTP,
        updateProfile,
      }}
    >
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
