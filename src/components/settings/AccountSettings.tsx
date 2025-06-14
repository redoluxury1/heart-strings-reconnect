
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";

const AccountSettings: React.FC = () => {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteAccount = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch("/functions/v1/delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user?.id }),
      });
      const data = await resp.json();
      if (data.success) {
        await signOut();
        window.location.href = "/";
      } else {
        setError(data.error || "Could not delete account.");
      }
    } catch (e: any) {
      setError(e.message || "Unknown error.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button variant="destructive" className="mt-8" onClick={() => setOpen(true)}>
        Delete My Account
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Account Deletion</DialogTitle>
          </DialogHeader>
          <p className="mb-4 text-red-700">
            Are you sure you want to delete your account? This cannot be undone and all your personal data will be erased.
          </p>
          {error && <p className="text-red-500">{error}</p>}
          <DialogFooter>
            <Button onClick={() => setOpen(false)} disabled={loading} variant="ghost">Cancel</Button>
            <Button onClick={handleDeleteAccount} disabled={loading} variant="destructive">
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountSettings;
