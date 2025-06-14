
import React from "react";
import AccountSettings from "@/components/settings/AccountSettings";

const SettingsPage = () => {
  return (
    <div className="max-w-lg mx-auto pt-12 px-4">
      <h2 className="text-xl font-cormorant mb-6">Account Settings</h2>
      <AccountSettings />
    </div>
  );
};

export default SettingsPage;
