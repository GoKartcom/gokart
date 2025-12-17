import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Phone, ArrowRight, User, MapPin, ShoppingBag, Store, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Step = "phone" | "otp" | "details" | "permissions";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [userType, setUserType] = useState<"customer" | "merchant">("customer");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setIsLoading(true);
    
    // Simulate OTP sending (in production, integrate with SMS service)
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      toast.success("OTP sent to your phone!");
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOTP = () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter complete OTP");
      return;
    }
    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      setStep("details");
      toast.success("Phone verified successfully!");
    }, 1000);
  };

  const handleSubmitDetails = async () => {
    if (!fullName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    setIsLoading(true);

    try {
      // Create profile in database
      const { error } = await supabase.from("profiles").insert({
        phone_number: phoneNumber,
        full_name: fullName,
        user_type: userType,
        address: address || null,
      });

      if (error) {
        if (error.code === "23505") {
          toast.error("This phone number is already registered");
        } else {
          throw error;
        }
        setIsLoading(false);
        return;
      }

      setStep("permissions");
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = () => {
    toast.success("Welcome to FreshMart!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-2xl gradient-orange flex items-center justify-center shadow-orange">
              <ShoppingBag className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-3xl font-display font-bold text-foreground">FreshMart</span>
          </div>
          <p className="text-muted-foreground">Fresh groceries delivered in 10-15 minutes</p>
        </div>

        {/* Progress indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {["phone", "otp", "details", "permissions"].map((s, i) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                step === s ? "w-8 bg-primary" : 
                ["phone", "otp", "details", "permissions"].indexOf(step) > i 
                  ? "w-2 bg-primary" 
                  : "w-2 bg-border"
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="bg-card rounded-3xl shadow-elevated p-8">
          {step === "phone" && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  Enter your phone number
                </h2>
                <p className="text-muted-foreground text-sm">
                  We'll send you a verification code
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                    +91
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="pl-14 h-14 text-lg"
                    maxLength={10}
                  />
                </div>
              </div>

              <Button
                onClick={handleSendOTP}
                disabled={isLoading || phoneNumber.length < 10}
                className="w-full h-14 text-lg font-semibold gradient-orange border-0 shadow-orange hover:opacity-90 transition-opacity"
              >
                {isLoading ? "Sending..." : "Get OTP"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          )}

          {step === "otp" && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  Verify OTP
                </h2>
                <p className="text-muted-foreground text-sm">
                  Enter the 6-digit code sent to +91 {phoneNumber}
                </p>
              </div>

              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !digit && index > 0) {
                        const prevInput = document.getElementById(`otp-${index - 1}`);
                        prevInput?.focus();
                      }
                    }}
                    className="otp-input"
                  />
                ))}
              </div>

              <Button
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.join("").length !== 6}
                className="w-full h-14 text-lg font-semibold gradient-orange border-0 shadow-orange hover:opacity-90 transition-opacity"
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </Button>

              <button
                onClick={() => setStep("phone")}
                className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Change phone number
              </button>
            </div>
          )}

          {step === "details" && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  Complete your profile
                </h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>I am a</Label>
                  <RadioGroup
                    value={userType}
                    onValueChange={(v) => setUserType(v as "customer" | "merchant")}
                    className="flex gap-4"
                  >
                    <label
                      htmlFor="customer"
                      className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        userType === "customer"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value="customer" id="customer" />
                      <ShoppingBag className="w-5 h-5 text-primary" />
                      <span className="font-medium">Customer</span>
                    </label>
                    <label
                      htmlFor="merchant"
                      className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        userType === "merchant"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value="merchant" id="merchant" />
                      <Store className="w-5 h-5 text-primary" />
                      <span className="font-medium">Merchant</span>
                    </label>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Delivery Address (optional)
                  </Label>
                  <Input
                    id="address"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              <Button
                onClick={handleSubmitDetails}
                disabled={isLoading || !fullName.trim()}
                className="w-full h-14 text-lg font-semibold gradient-orange border-0 shadow-orange hover:opacity-90 transition-opacity"
              >
                {isLoading ? "Saving..." : "Continue"}
              </Button>
            </div>
          )}

          {step === "permissions" && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-success-green/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-success-green" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  You're all set!
                </h2>
                <p className="text-muted-foreground text-sm">
                  Enable permissions for the best experience
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Location Access</p>
                    <p className="text-xs text-muted-foreground">For accurate delivery</p>
                  </div>
                  <div className="w-10 h-6 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-primary-foreground rounded-full" />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary">
                  <Phone className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Notifications</p>
                    <p className="text-xs text-muted-foreground">Order updates & offers</p>
                  </div>
                  <div className="w-10 h-6 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-primary-foreground rounded-full" />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleFinish}
                className="w-full h-14 text-lg font-semibold gradient-orange border-0 shadow-orange hover:opacity-90 transition-opacity"
              >
                Start Shopping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Register;
