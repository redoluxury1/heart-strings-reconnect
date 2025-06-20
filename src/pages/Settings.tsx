
import React from "react";
import AccountSettings from "@/components/settings/AccountSettings";
import AppStoreChecklist from "@/components/settings/AppStoreChecklist";

const SettingsPage = () => {
  return (
    <div className="max-w-4xl mx-auto pt-12 px-4 space-y-8">
      <h2 className="text-xl font-cormorant mb-6">Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-cormorant mb-4">Account Settings</h3>
          <AccountSettings />
        </div>
        
        <div>
          <h3 className="text-lg font-cormorant mb-4">App Store Submission</h3>
          <AppStoreChecklist />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
