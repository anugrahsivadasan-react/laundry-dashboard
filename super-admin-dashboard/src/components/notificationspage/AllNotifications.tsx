import React from "react";
import {type Notification } from "./types";

interface Props {
  data: Notification[];
}

const AllNotifications: React.FC<Props> = ({ data }) => {
  return (
    <>
    <div className="">
        <h2 className="text-sm text-gray-300 mb-4">
          All Notification History
        </h2>
        <div className="grid grid-cols-6 text-xs text-gray-400 border-b border-white/10 pb-3 mb-3">
                  <p className="col-span-2">Title & Message</p>
                  <p>Target</p>
                  <p>Recipients</p>
                  <p>Date & Time</p>
                  <p>Status</p>
                </div>
   
      {data.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-6 items-start text-sm border-b border-white/5 pb-4"
        >
            
          <div className="col-span-2">
            <p className="text-white font-medium">{item.title}</p>
            <p className="text-gray-400 text-xs mt-1">
              {item.message}
            </p>
          </div>

          <p className="text-gray-300 text-xs">{item.target}</p>

          <p className="text-gray-300 text-xs">
            {item.recipients.toLocaleString()}
          </p>

          <div className="text-gray-300 text-xs">
            <p>{item.date}</p>
            <p className="text-gray-500">{item.time}</p>
          </div>

          <div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-green-600/20 text-green-400">
              {item.status}
            </span>
          </div>
        </div>
         
      ))}
      </div>
    </>
  );
};

export default AllNotifications;
