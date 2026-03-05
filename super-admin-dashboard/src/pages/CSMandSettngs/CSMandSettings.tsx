import React from 'react'
import CSMtabs from '../../components/CSMandSetttings/CSMtabs'

const CSMandSettings = () => {
  return (
<div className='p-6'>

         {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-white">
            CMS & System Settings
          </h1>
          <p className="text-[16px] leading-[24px] font-arimo text-[#6A7282]">
Manage content and configure system settings          </p>
        </div>

      
       
      </div>
        <div className=""></div>

        <CSMtabs/>


   

    </div>  )
}

export default CSMandSettings