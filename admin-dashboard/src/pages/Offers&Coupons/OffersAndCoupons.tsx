import React from 'react'
import OffersStats from '../../components/Offers&Coupons/OfferStatCard'
import OffersList from '../../components/Offers&Coupons/OffersList'
import CreateOfferModal from '../../components/Offers&Coupons/CreateOfferModal'
import { useState } from 'react'

const OffersAndCoupons : React.FC = () => {

const [openCreateModal, setOpenCreateModal] = useState(false)

  return (
    <div className="p-6 bg-[#F3F6F9] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-[#101828]">
            Offers & Coupons
       </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
            Track and manage all payment transactions
          </p>
        </div>
         <button className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90 flex items-center gap-2"
         onClick={()=> setOpenCreateModal(true)}>

          + Create Offer
        </button>
        </div>

<div className='mb-8'> 
    <OffersStats/>
</div>

<div>
    <OffersList/>
</div>

<div>
<CreateOfferModal 
open={openCreateModal}
onClose={()=> setOpenCreateModal(false)}
/> 
        </div>
  
</div>

  )
}

export default OffersAndCoupons 
