'use client';
import SidebarContent from '@/components/sections/top-section/SidebarContent';
import React from 'react';

export default function SinglePageLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 container">
      <main className="w-full">{children}</main>
      <div className="w-full lg:w-[35%]">
        <SidebarContent />
      </div>
    </div>
  );
}
