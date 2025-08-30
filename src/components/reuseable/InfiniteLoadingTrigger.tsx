import React from 'react';

interface InfiniteLoadingTriggerProps {
  ref: (node?: Element | null | undefined) => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
}

export default function InfiniteLoadingTrigger({ ref, isFetchingNextPage, hasNextPage }: InfiniteLoadingTriggerProps) {
  return (
    <div ref={ref} className="mt-12 flex justify-center">
      {isFetchingNextPage ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading more posts...</p>
        </div>
      ) : hasNextPage ? (
        <p className="text-sm text-muted-foreground">Scroll down to load more</p>
      ) : (
        <p className="text-sm text-muted-foreground">You've reached the end</p>
      )}
    </div>
  );
}
