'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { calculateReadingTime } from '@/utils/helper';
import { format } from 'date-fns';
import SkeletonCard from './SkeletonCard';
import { BlogCard } from './blog-card';
import { Post } from '@/types/post'; // Import your Post type

interface PostCarouselProps {
  category: string;
  limit?: number;
  loading?: boolean;
  error?: boolean;
  posts?: Post[]; // Use your Post type directly
}

export function PostCarousel({ category, limit = 1, loading, error, posts }: PostCarouselProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <SkeletonCard count={1} className="gap-3" cols={{ default: 1 }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Failed to load {category} posts</p>
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No {category} posts available</p>
      </div>
    );
  }

  return (
    <Carousel opts={{ align: 'start', loop: true }} plugins={[Autoplay({ delay: 8000, stopOnMouseEnter: true, stopOnInteraction: false })]} className="w-full">
      <CarouselContent>
        {posts.map(post => (
          <CarouselItem key={post._id} className="basis-full">
            <BlogCard
              title={post.title}
              href={`/posts/${post.slug}`}
              imageUrl={post.featuredImage?.url}
              category={post.categories?.[0]?.title}
              categorySlug={post.categories?.[0]?.slug}
              date={format(new Date(post.publishedAt), 'MMM d, yyyy')}
              readingTime={calculateReadingTime(post.excerpt || '')}
              excerpt={post.excerpt || ''}
              authorName={post.author.name}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 top-[51.7%]" />
      <CarouselNext className="right-2 top-[51.7%]" />
    </Carousel>
  );
}
