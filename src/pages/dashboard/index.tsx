import { SearchSection } from "@/components/SearchSection";
import React from "react";

const TracksSection = () => {
  return (
    <div className="w-1/2 bg-gray-300 p-4">
      <div className="mb-4 text-lg font-semibold">Tracks</div>
      <ul className="divide-y divide-gray-500">
        <li className="py-2">Track 1</li>
        <li className="py-2">Track 2</li>
        <li className="py-2">Track 3</li>
      </ul>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-full flex-col">
        {/* Top Section */}
        <div className="flex h-1/2 flex-row">
          {/* Left Half of Top Section */}
          <SearchSection />
          {/* Right Half of Top Section */}
          <TracksSection />
        </div>
        {/* Bottom Section */}
        <div className="h-1/2 bg-gray-400"></div>
      </div>
    </div>
  );
};

export default Dashboard;
