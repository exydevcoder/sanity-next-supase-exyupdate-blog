import { Button } from '@/components/ui/button';
import React from 'react';
import { RiArrowDownWideLine, RiArrowUpWideLine } from 'react-icons/ri';

interface CustomCarouselBtnProps {
  scrollPrev: () => void;
  canScrollPrev: boolean;
  scrollNext: () => void;
  canScrollNext: boolean;
}

export default function CustomCarouselBtn({ scrollPrev, canScrollPrev, scrollNext, canScrollNext }: CustomCarouselBtnProps) {
  return (
    <>
      <Button
        variant="default"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-none size-2 p-0 text-black bg-transparent hover:bg-transparent shadow-none disabled:opacity-50"
      >
        <RiArrowUpWideLine size={20} />
      </Button>
      <Button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-none size-2 p-0 text-black bg-transparent hover:bg-transparent shadow-none disabled:opacity-50"
      >
        <RiArrowDownWideLine size={20} />
      </Button>
    </>
  );
}
