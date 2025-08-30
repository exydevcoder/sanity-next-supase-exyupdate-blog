import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserInitials } from '@/utils/getUserInitials';

interface UserAvatarProps {
  fullName?: string | null;
  avatarUrl?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-16 w-16 text-lg',
  xl: 'h-20 w-20 text-xl'
};

export function UserAvatar({ fullName, avatarUrl, size = 'md', className = '' }: UserAvatarProps) {
  const initials = getUserInitials(fullName);

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage src={avatarUrl || undefined} alt={fullName || 'User avatar'} />
      <AvatarFallback className="bg-gray-500 text-white font-semibold">{initials}</AvatarFallback>
    </Avatar>
  );
}
