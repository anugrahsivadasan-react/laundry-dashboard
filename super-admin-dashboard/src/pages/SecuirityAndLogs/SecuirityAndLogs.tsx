import React from "react"
import SecuirityStats from "../../components/SecuirityAndLogs/SecuirityStats"
import SecuirityTabs from "../../components/SecuirityAndLogs/ScuirityTabs"

const SecuirityAndLogs = () => {
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-white">
            Security & System Control{" "}
          </h1>
          <p className="text-[16px] font-arimo text-[#6A7282]">
            Monitor system security and manage activity logs{" "}
          </p>
        </div>
      </div>
      <SecuirityStats />

      <div className="pt-6">
        <SecuirityTabs />
      </div>
    </div>
  )
}

export default SecuirityAndLogs
