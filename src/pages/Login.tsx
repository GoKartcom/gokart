import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Phone, ArrowRight, Loader, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuthContext } from "@/context/AuthContext";
import { NameDialog } from "@/components/NameDialog";
import klickitLogo from "@/assets/klickit-logo.png";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [currentPhone, setCurrentPhone] = useState("");
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [isSubmittingName, setIsSubmittingName] = useState(false);

  const { loginWithGoogle, loginWithPhone, verifyPhoneOTP, updateProfile, isLoading, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/shop";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = `+91${formattedPhone}`;
    }

    const result = await loginWithPhone(formattedPhone);

    if (result.success) {
      setCurrentPhone(formattedPhone);
      setShowOTP(true);
      toast.success("OTP sent to your phone!");
    } else {
      toast.error(result.message || "Failed to send OTP. Please try again.");
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim() || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    const result = await verifyPhoneOTP(currentPhone, otp);

    if (!result.success) {
      toast.error(result.message || "Invalid OTP");
      return;
    }

    if (result.isNewUser) {
      setShowNameDialog(true);
    } else {
      toast.success("Successfully logged in!");
    }
  };

  const handleNameSubmit = async (name: string) => {
    setIsSubmittingName(true);
    try {
      await updateProfile(name);
      toast.success("Welcome to Klickit!");
      setShowNameDialog(false);
    } catch (error) {
      toast.error("Failed to save name");
    } finally {
      setIsSubmittingName(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <img src={klickitLogo} alt="Klickit" className="h-14 w-auto" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground mt-2 text-center">
            Sign in to continue to Klickit
          </p>
        </div>

        <div className="space-y-6">
          {/* Google Sign In */}
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            size="lg"
            className="w-full h-12 gap-3 text-base"
            disabled={isLoading}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

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
                className="w-full gap-2"
                onClick={() => {
                  setShowOTP(false);
                  setOtp("");
                }}
              >
                <ArrowLeft className="h-4 w-4" />
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
