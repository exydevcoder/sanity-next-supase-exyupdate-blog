import React from 'react';
import AdvertisementSection from './advertisement';
import LatestMusicSection from './latest-muisc';

export default function SidebarContent() {
  return (
    <div className="flex flex-col md:flex-row lg:flex-col gap-8">
      <div className="w-full">
        <AdvertisementSection />
      </div>
      <div className="w-full">
        <LatestMusicSection />
      </div>
    </div>
  );
}
