import React, { useState } from "react";
import AccountHeader from "../../components/accountsection/AccountHeader";
import AccountTabs from "../../components/accountsection/AccountTabs";
import ProfileTab from "../../components/accountsection/AccountTabCards/ProfileCards";
import SecurityTab from "../../components/accountsection/AccountTabCards/SecuirtyCards";
import ActiveSessions from "../../components/accountsection/AccountTabCards/ActiveSessionCaards";
import LoginHistoryTab from "../../components/accountsection/AccountTabCards/LoginHistoryCards";
import { type Tab } from "../../components/accountsection/account.types";



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
