
import React from "react";
import AccountSettings from "@/components/settings/AccountSettings";
import PartnerSettings from "@/components/settings/PartnerSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import ProfileSettings from "@/components/settings/ProfileSettings";
import CommunicationPreferences from "@/components/settings/CommunicationPreferences";

const SettingsPage = () => {
  return (
    <div className="max-w-4xl mx-auto pt-12 px-4 space-y-8">
      <h2 className="text-2xl font-cormorant mb-8">Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ProfileSettings />
          <PartnerSettings />
          <AccountSettings />
        </div>
        
        <div className="space-y-6">
          <NotificationSettings />
          <CommunicationPreferences />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
