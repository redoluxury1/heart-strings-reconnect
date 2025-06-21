
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { StoreKitService } from "@/services/storeKitService";
import { toast } from "@/hooks/use-toast";

const APPLE_SUBSCRIPTION_URL = "itms-apps://apps.apple.com/account/subscriptions";

const AccountSettings: React.FC = () => {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [restorePending, setRestorePending] = useState(false);

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

  // Open Apple subscriptions page in a new tab/window
  const handleManageSubscription = () => {
    window.open(APPLE_SUBSCRIPTION_URL, "_blank", "noopener,noreferrer");
  };

  // Restore purchases using StoreKitService - FIXED: removed user.id parameter
  const handleRestorePurchases = async () => {
    setRestorePending(true);
    try {
      if (!user?.id) throw new Error("User not found");
      const service = StoreKitService.getInstance();
      const restored = await service.restorePurchases();
      if (restored && restored.length > 0) {
        toast({
          title: "Restored",
          description: "Your purchases were successfully restored.",
        });
      } else {
        toast({
          title: "Nothing to Restore",
          description: "No previous purchases were found for your account.",
        });
      }
    } catch (e: any) {
      toast({
        title: "Restore Failed",
        description: e.message || "Restoring purchases failed.",
        variant: "destructive",
      });
    } finally {
      setRestorePending(false);
    }
  };

  // Debug mode toggle for testing - now always visible for easier access
  const toggleDebugMode = () => {
    const isCurrentlyEnabled = localStorage.getItem('bypassSubscription') === 'true';
    if (isCurrentlyEnabled) {
      localStorage.removeItem('bypassSubscription');
      toast({
        title: "Debug Mode Disabled",
        description: "Subscription gates are now active.",
      });
    } else {
      localStorage.setItem('bypassSubscription', 'true');
      toast({
        title: "Debug Mode Enabled",
        description: "All subscription gates are now bypassed.",
      });
    }
    // Force a page refresh to apply the changes
    window.location.reload();
  };

  const isDebugMode = localStorage.getItem('bypassSubscription') === 'true';

  return (
    <div>
      {/* Debug Mode Toggle - now always visible */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">Debug Mode</h3>
        <p className="text-xs text-yellow-700 mb-3">
          Toggle subscription bypass for testing purposes
        </p>
        <Button
          onClick={toggleDebugMode}
          variant={isDebugMode ? "destructive" : "outline"}
          size="sm"
        >
          {isDebugMode ? "Disable Debug Mode" : "Enable Debug Mode"}
        </Button>
        {isDebugMode && (
          <p className="text-xs text-yellow-600 mt-2">
            🔓 Subscription gates are currently bypassed
          </p>
        )}
      </div>

      <Button variant="destructive" className="mt-8" onClick={() => setOpen(true)}>
        Delete My Account
      </Button>
      <div className="mt-10 space-y-4">
        <Button
          onClick={handleManageSubscription}
          className="w-full text-[#2e4059] border border-[#ded4ee] bg-white hover:bg-[#f6f5fc] font-semibold transition-all"
          variant="outline"
        >
          Manage Subscription
        </Button>
        <Button
          onClick={handleRestorePurchases}
          className="w-full"
          variant="secondary"
          disabled={restorePending}
        >
          {restorePending ? "Restoring..." : "Restore Purchases"}
        </Button>
      </div>
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
    </div>
  );
};

export default AccountSettings;
