import React from 'react'
import SettingsTab from '../../components/settingspage/SettingsTab'
import { useState } from 'react'
import { type Tab } from '../../components/settingspage/settings.type'
import SettingsTabsContainer from '../../components/settingspage/SettingsTabsContainer'



const Settings: React.FC = () => {
      const [activeTab, setActiveTab] = useState<Tab>("general");
    
  return (
   <div className="p-6 bg-[#F3F6F9] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-[#101828]">
          Settings
          </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
           Configure your admin panel and business settings
          </p>
        </div>
  <button className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90"  
         >

         Save Changes
        </button> 
 



        </div>
        <SettingsTab
 activeTab={activeTab}
        onChange={setActiveTab}/>



<SettingsTabsContainer/>


    </div>
       
        

  )
}

export default Settings
