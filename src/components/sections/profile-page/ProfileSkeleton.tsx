import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function ProfileSkeleton({ showCircle = true }: { showCircle?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {showCircle && <Skeleton className=" w-17 h-17 rounded-full" />}
      <div className="flex flex-col gap-2">
        <Skeleton className=" w-45 h-4 rounded-full" />
        <Skeleton className=" w-32 h-4 rounded-full" />
      </div>
    </div>
  );
}
