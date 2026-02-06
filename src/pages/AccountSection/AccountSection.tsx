import React, { useState } from "react";
import AccountHeader from "../../components/accountSection/AccountHeader";
import AccountTabs from "../../components/accountSection/AccountTabs";
import ProfileTab from "../../components/accountSection/AccountTabCards/ProfileCards";
import SecurityTab from "../../components/accountSection/AccountTabCards/SecuirtyCards";
import ActiveSessions from "../../components/accountSection/AccountTabCards/ActiveSessionCaards";
import LoginHistoryTab from "../../components/accountSection/AccountTabCards/LoginHistoryCards";
const AccountSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <div className="pt-6">
      {/* Header */}
      <AccountHeader />

      {/* Tabs */}
      <AccountTabs
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* TAB CONTENT */}
      <div className="mt-6">
        {activeTab === "profile" && <ProfileTab />}

        {activeTab === "security" && (
         <SecurityTab />
        )}

        {activeTab === "active" && (
            <ActiveSessions/>
        )}

        {activeTab === "login" && (
          <LoginHistoryTab/>
        )}
      </div>
    </div>
  );
};

export default AccountSection;
