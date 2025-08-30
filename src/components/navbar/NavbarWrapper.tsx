'use client';

import { usePathname } from 'next/navigation';
import SiteNavbar from '@/components/navbar/site-navbar';

const HIDDEN_ROUTES = ['/admin', '/auth/reset-password'];

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Check if current path matches hidden routes
  const shouldHideNavbar = HIDDEN_ROUTES.some(route => {
    if (route === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(route);
  });

  // Don't render anything if navbar should be hidden
  if (shouldHideNavbar) {
    return null;
  }

  return <SiteNavbar />;
}