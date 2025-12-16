// src/pages/Profile.tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuthContext } from "@/context/AuthContext";
import { User, Phone, Mail } from "lucide-react";

export default function Profile() {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          My Profile
        </h1>

        <div className="max-w-2xl">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-4 mb-6">
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="h-20 w-20 rounded-full"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
              )}
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">
                  {user?.name}
                </h2>
                <p className="text-sm text-muted-foreground">Customer</p>
              </div>
            </div>

            <div className="space-y-4">
              {user?.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{user.email}</p>
                  </div>
                </div>
              )}

              {user?.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">{user.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}