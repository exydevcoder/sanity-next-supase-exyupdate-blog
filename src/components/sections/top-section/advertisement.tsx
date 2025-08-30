import React from 'react';
import SkeletonCard from '../../reuseable/SkeletonCard';
import ComponentTitle from '../../reuseable/component-title';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { useActiveAdverts } from '@/lib/queries/adverts/getActiveAdverts';
import AdvertContent from '../top-section/AdvertContent';
import CustomCarouselBtn from './CustomCarouselBtn';

export default function AdvertisementSection() {
  const { data: adverts, isLoading, error } = useActiveAdverts();

  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const itemCount = adverts?.length || 0;
  const showCarouselControls = itemCount > 4;

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    onSelect();
    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  // Error state
  if (error) {
    return (
      <div className="flex flex-col gap-3">
        <ComponentTitle title="Advertisement" className="!text-xl font-semibold" />
        <div className="text-sm text-red-500">Failed to load advertisements</div>
      </div>
    );
  }

  return (
    <div className={`flex bg-gray-50/50 px-2 pt-2 pb-5 rounded-lg shadow-xs flex-col ${showCarouselControls ? 'gap-3' : ''}`}>
      <ComponentTitle title="Advertisement" className="!text-xl font-semibold" />
      {isLoading ? (
        <SkeletonCard
          count={5}
          className="gap-3"
          cols={{ default: 1 }}
          skeletonProps={{
            variant: 'advert',
            imageHeight: 'h-16',
            imageWidth: 'w-16',
            titleWidth: '',
            descriptionWidth: 'w-2/4',
            gap: 'space-y-3'
          }}
        />
      ) : !adverts || adverts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No advertisements available</p>
        </div>
      ) : (
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start'
          }}
          plugins={[Autoplay({ delay: 10000, stopOnMouseEnter: true, stopOnInteraction: false })]}
          orientation="vertical"
          className="w-full"
        >
          <CarouselContent className="-mt-1" style={{ maxHeight: '400px', display: 'block' }}>
            {adverts.map(advert => (
              <CarouselItem key={advert._id} className="pt-1 border-b border-b-gray-100 py-2 h-auto">
                {advert.clickUrl ? (
                  <Link href={advert.clickUrl} target={advert.openInNewTab ? '_blank' : '_self'} rel={advert.openInNewTab ? 'noopener noreferrer' : undefined} className="block">
                    <AdvertContent advert={advert} />
                  </Link>
                ) : (
                  <AdvertContent advert={advert} />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          {showCarouselControls && (
            <>
              <CustomCarouselBtn scrollPrev={scrollPrev} canScrollPrev={canScrollPrev} scrollNext={scrollNext} canScrollNext={canScrollNext} />
            </>
          )}
        </Carousel>
      )}
    </div>
  );
}
