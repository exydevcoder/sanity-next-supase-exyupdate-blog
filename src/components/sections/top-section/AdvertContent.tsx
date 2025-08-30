import { Advert } from '@/types/adverts';
import Image from 'next/image';
import React from 'react';

export default function AdvertContent({ advert }: { advert: Advert }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-17 h-17 sm:w-16 sm:h-16 flex flex-col gap-1 flex-shrink-0 group">
        <Image
          src={advert.image.asset.url}
          alt={advert.altText}
          width={400}
          height={192}
          className="w-full h-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          priority={false}
        />
        <p className="text-[10px] text-muted-foreground">{advert.advertiser}</p>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <h3 className="text-[15px] sm:text-xs line-clamp-2 font-medium leading-snug mb-1">{advert.title}</h3>
        <p className="line-clamp-2 text-sm sm:text-xs text-muted-foreground">{advert.description}</p>
        {advert.tags && advert.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {advert.tags.slice(0, 2).map((tag: string, index: number) => (
              <span key={index} className="inline-block px-1.5 py-0.5 text-[10px] bg-gray-100 text-muted-foreground rounded">
                {tag}
              </span>
            ))}
            {advert.tags.length > 2 && <span className="text-xs text-gray-400">+{advert.tags.length - 2}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
