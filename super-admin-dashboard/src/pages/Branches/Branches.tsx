 

const Branches = () => {
  return (
     <div className="p-6 bg-[#0A0A0A] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-white">
            Branch Management
          </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
            Manage All Your Laundry Branches
          </p>
        </div>

        <button className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90"
        //  onClick={() => setOpenModal(true)}
         >

           +  Add Branch
        </button>
      </div>
        </div>
  )
}

export default Branches
