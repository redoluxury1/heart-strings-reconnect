
import React from "react";
import AccountSettings from "@/components/settings/AccountSettings";

const SettingsPage = () => {
  return (
    <div className="max-w-2xl mx-auto pt-12 px-4 space-y-8">
      <h2 className="text-xl font-cormorant mb-6">Settings</h2>
      
      <div>
        <h3 className="text-lg font-cormorant mb-4">Account Settings</h3>
        <AccountSettings />
      </div>
    </div>
  );
};

export default SettingsPage;
