import React from 'react';
import { Skeleton } from '../ui/skeleton';

interface SkeletonCardProps {
  count?: number;
  className?: string;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  skeletonProps?: {
    imageHeight?: string;
    imageWidth?: string;
    titleWidth?: string;
    descriptionWidth?: string;
    gap?: string;
    variant?: 'default' | 'advert'; // Add variant prop
  };
}

export default function SkeletonCard({
  count = 6,
  className = '',
  cols = { default: 1, sm: 2, lg: 3, xl: 3 },
  skeletonProps = {
    imageHeight: 'h-48',
    imageWidth: 'w-full',
    titleWidth: 'w-3/4',
    descriptionWidth: 'w-1/2',
    gap: 'space-y-4',
    variant: 'default'
  }
}: SkeletonCardProps) {
  // Generate responsive grid classes
  const gridClasses = [
    `grid-cols-${cols.default ?? 1}`,
    cols.sm ? `sm:grid-cols-${cols.sm}` : '',
    cols.md ? `md:grid-cols-${cols.md}` : '',
    cols.lg ? `lg:grid-cols-${cols.lg}` : '',
    cols.xl ? `xl:grid-cols-${cols.xl}` : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`grid ${gridClasses} ${className}`}>
      {Array.from({ length: count }).map((_, i) =>
        skeletonProps.variant === 'advert' ? (
          // advert layout (image left, content right)
          <div key={i} className="flex items-start gap-3">
            <Skeleton className={`${skeletonProps.imageHeight} ${skeletonProps.imageWidth || 'w-16'} rounded-sm`} />
            <div className={`flex-1 ${skeletonProps.gap}`}>
              <Skeleton className={`h-4 ${skeletonProps.titleWidth}`} />
              <Skeleton className={`h-4 ${skeletonProps.descriptionWidth}`} />
            </div>
          </div>
        ) : (
          // Default layout (stacked)
          <div key={i} className={`${skeletonProps.gap}`}>
            <Skeleton className={`${skeletonProps.imageHeight} ${skeletonProps.imageWidth || 'w-full'} rounded-lg`} />
            <Skeleton className={`h-4 ${skeletonProps.titleWidth}`} />
            <Skeleton className={`h-4 ${skeletonProps.descriptionWidth}`} />
          </div>
        )
      )}
    </div>
  );
}
