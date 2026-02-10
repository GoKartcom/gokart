import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Phone, ArrowRight, Loader } from "lucide-react";
import { toast } from "sonner";
import { useAuthContext } from "@/context/AuthContext";
import { NameDialog } from "@/components/NameDialog";
import { authService } from "@/services/authService";

declare global {
  interface Window {
    google?: any;
  }
}

export default function Login() {
  const [phone, setPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [currentPhone, setCurrentPhone] = useState("");
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [isSubmittingName, setIsSubmittingName] = useState(false);
  
  const { loginWithGoogle, sendOTP, verifyOTP, isLoading, isAuthenticated, setUserFromStorage } = useAuthContext();
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google && googleButtonRef.current) {
        try {
          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleGoogleSignInSuccess,
            auto_select: false,
            ux_mode: "popup",
          });

          window.google.accounts.id.renderButton(googleButtonRef.current, {
            theme: "outline",
            size: "large",
            width: "100%",
            text: "continue_with",
          });
        } catch (error) {
          console.error("Error initializing Google Sign-In:", error);
        }
      }
    };

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      try {
        document.body.removeChild(script);
      } catch (e) {
        // Script already removed
      }
    };
  }, []);

  const handleGoogleSignInSuccess = async (response: any) => {
    await loginWithGoogle(response);
    toast.success("Successfully logged in!");
    setTimeout(() => navigate("/"), 500);
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    // Format phone number with country code if needed
    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = `+91${formattedPhone}`;
    }

    const success = await sendOTP(formattedPhone);
    
    if (success) {
      setCurrentPhone(formattedPhone);
      setShowOTP(true);
      toast.success("OTP sent to your phone!");
    } else {
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp.trim() || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    const result = await verifyOTP(currentPhone, otp);
    
    if (!result.success) {
      toast.error(result.message || "Invalid OTP");
      return;
    }

    if (result.isNewUser) {
      setCurrentUserId(result.user?.id || "");
      setShowNameDialog(true);
    } else {
      toast.success("Successfully logged in!");
      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleNameSubmit = async (name: string) => {
    setIsSubmittingName(true);
    try {
      const result = await authService.saveName(currentUserId, name);
      
      if (result.success) {
        setUserFromStorage();
        toast.success("Welcome to Klickit!");
        setTimeout(() => navigate("/"), 500);
      } else {
        toast.error(result.message || "Failed to save name");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmittingName(false);
      setShowNameDialog(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Leaf className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">
              Klickit
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground mt-2 text-center">
            Sign in to continue to Klickit
          </p>
        </div>

        <div className="space-y-6">
          <div ref={googleButtonRef} style={{ display: "flex", justifyContent: "center" }} />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {!showOTP ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 h-12"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full h-12 gap-2" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOTPSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <p className="text-sm text-muted-foreground">
                  We've sent a 6-digit code to {currentPhone}
                </p>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="h-12 text-center text-lg tracking-widest"
                  maxLength={6}
                  disabled={isLoading}
                  autoFocus
                />
              </div>
              <Button type="submit" size="lg" className="w-full h-12 gap-2" disabled={isLoading || otp.length !== 6}>
                {isLoading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify OTP
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setShowOTP(false);
                  setOtp("");
                }}
              >
                Back
              </Button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link to="/refund-policy" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/refund-policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>

      <NameDialog 
        open={showNameDialog} 
        onSubmit={handleNameSubmit}
        isLoading={isSubmittingName}
      />
    </div>
  );
}