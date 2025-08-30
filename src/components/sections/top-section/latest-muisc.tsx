import React from 'react';
import SkeletonCard from '../../reuseable/SkeletonCard';
import ComponentTitle from '../../reuseable/component-title';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { usePostsByCategory } from '@/lib/queries/posts/getPostsByCategory';
import Image from 'next/image';
import CustomCarouselBtn from './CustomCarouselBtn';

export default function LatestMusic() {
  const { data, isLoading, error } = usePostsByCategory('music', 7);

  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  // Extract posts from the response and get the count
  const posts = data?.posts || [];
  const itemCount = posts.length;
  const showCarouselControls = itemCount > 7;

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
        <ComponentTitle title="Latest music update" className="!text-xl font-semibold" />
        <div className="text-sm text-red-500">Failed to load latest music</div>
      </div>
    );
  }

  return (
    <div className={`flex h-auto bg-gray-50/50 px-2 pt-2 pb-5 rounded-lg shadow-xs flex-col ${showCarouselControls ? 'gap-3' : ''}`}>
      <ComponentTitle title="Latest music update" className="!text-xl font-semibold" />
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
      ) : !data || posts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No latest music post available</p>
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
            {posts.map(post => (
              <CarouselItem key={post._id} className="pt-1 h-auto">
                <Link href={`/posts/${post.slug}`} className="flex border-b border-b-gray-100 gap-3 py-1 items-start">
                  <div className="flex flex-col gap-1 group">
                    <div className="w-full h-full">
                      <Image
                        src={post.featuredImage?.url || ''}
                        alt={post.title}
                        width={400}
                        height={400}
                        className="w-[60px] h-[60px] rounded-lg object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        priority={false}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground">{post.categories?.[0]?.title}</p>
                  </div>

                  <div className="flex flex-col flex-1 overflow-hidden">
                    <h3 className="text-[15px] sm:text-xs line-clamp-2 font-medium leading-snug mb-1">{post.title}</h3>
                    <p className="line-clamp-2 text-sm sm:text-xs text-muted-foreground">{post.excerpt}</p>
                  </div>
                </Link>
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
