'use client';

import { LogIn, Search, User, BookDown } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { useDialog } from '@/store/dialogs-store';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '../ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { UserAvatar } from '../reuseable/UserAvatar';
import LogoutButton from '../buttons/LogoutButton';

export default function RightNavButton() {
  const { onOpen } = useDialog();
  const { user, profile, isLoading, isAuthenticated } = useAuth();
  return (
    <div className="ml-auto flex items-center gap-2">
      <Button variant="ghost" size="icon" aria-label="Search" onClick={() => onOpen('search')}>
        <Search className="h-5 w-5" />
      </Button>
      {isLoading ? (
        <Skeleton className="h-10 w-10 rounded-full" />
      ) : isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
              <UserAvatar fullName={profile?.full_name} avatarUrl={profile?.avatar_url} size="sm" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {profile?.full_name && <p className="font-medium text-sm">{profile?.full_name}</p>}
                {user?.email && <p className="w-[200px] truncate text-xs text-muted-foreground">{user.email}</p>}
              </div>
            </div>
            <DropdownMenuSeparator />
            <Link href="/my-profile" className="">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/saved-posts" className="">
              <DropdownMenuItem className="cursor-pointer">
                <BookDown className="mr-2 h-4 w-4" />
                <span>Saved Posts</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="default" className="gap-2" onClick={() => onOpen('auth')}>
          <LogIn className="h-4 w-4" />
          <span>{'Sign in'}</span>
        </Button>
      )}
    </div>
  );
}
