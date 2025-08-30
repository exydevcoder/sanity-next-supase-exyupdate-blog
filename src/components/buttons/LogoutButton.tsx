'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Loader2, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const { signOut, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
      toast.success('Logout successfully!');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <Button onClick={handleLogout} disabled={isLoading} className="w-full flex flex-row justify-start !pl-0 h-6 bg-transparent shadow-none text-black font-normal hover:bg-transparent">
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </Button>
  );
}
