import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

interface NameDialogProps {
  open: boolean;
  onSubmit: (name: string) => Promise<void>;
  isLoading: boolean;
}

export function NameDialog({ open, onSubmit, isLoading }: NameDialogProps) {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      await onSubmit(name);
      setName("");
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to Klickit!</DialogTitle>
          <DialogDescription>
            Please enter your name to complete your profile
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !name.trim()}
          >
            {isLoading ? (
              <>
                <Loader className="h-4 w-4 animate-spin mr-2" />
                Creating profile...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}