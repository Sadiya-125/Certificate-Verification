import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NameInputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
  loading: boolean;
}

const NameInputDialog = ({ open, onOpenChange, onSubmit, loading }: NameInputDialogProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Enter Your Name</DialogTitle>
          <DialogDescription>
            Please Enter Your Full Name As It Appears On Your Certificate.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              required
              className="text-base"
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading || !name.trim()}
            className="w-full mouse-pointer py-2 border border-primary" 
            size="lg"
          >
            {loading ? "Saving..." : "Continue to Certificate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NameInputDialog;
