import { Calendar, Gift, Percent, Tag } from 'lucide-react';
import OfferAndCouponsStats from '../../components/offers&coupons/OffersAndCouponStats'
import OffersAndCouponsTabs from '../../components/offers&coupons/offerscouponstabs/OffersAndCouponsTabs';
import { useState } from 'react';
import NewOfferModal from '../../components/offers&coupons/NewOfferModal';

const statsData = [
  {
    title: "Total Admin",
    value: 12,
    icon: <Gift className="w-5 h-5 text-[#AD46FF]" />,
    iconBg: "bg-[#AD46FF1A]",
  },
  {
    title: "Active",
    value: 11,
    icon: <Tag className="w-5 h-5 text-[#00C950]" />,
    iconBg: "bg-[#00C9501A]",
  },
  {
    title: "New This Month",
    value: 1,
    icon: <Percent className="w-5 h-5 text-[#2B7FFF]" />,
    iconBg: "bg-[#2B7FFF1A]",
  },
  {
    title: "Branch Admins",
    value: 28,
    icon: <Calendar className="w-5 h-5 text-[#FE9A00]" />,
    iconBg: "bg-[#FE9A001A]",
  },
];

const OffersAndCoupons = () => { 

  const [open, setOpen] = useState(false);
  const [offers, setOffers] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<"all" | "active" | "expired" | "scheduled">("all");

  // ✅ FIX: define close handler
  const handleClose = () => {
    setOpen(false);
  };

const handleCreateOffer = (newOffer: any) => {
  setOffers((prev) => [newOffer, ...prev]); // add to top
  setOpen(false); // close modal
};

  return (
    <div className="p-6 bg-[#0A0A0A] min-h-screen">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-white">
            Offers & Coupons
          </h1>
          <p className="text-[14px] font-arimo text-[#A1A1A1]">
            Create and manage promotional campaigns
          </p>
        </div> 

        <button 
          className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90"
          onClick={() => setOpen(true)}
        >
          + Create Offer
        </button>
      </div>

      <OfferAndCouponsStats stats={statsData}/>

      <section className='mt-8'>
        <OffersAndCouponsTabs 
          activeTab={activeTab}
          onChange={setActiveTab}
          offers={offers}
        />
      </section>

      {/* ✅ FIX: correct props */}
      <NewOfferModal isOpen={open}
       onClose={handleClose}
      handleCreateOffer={handleCreateOffer} />

    </div>
  )
}

export default OffersAndCoupons;