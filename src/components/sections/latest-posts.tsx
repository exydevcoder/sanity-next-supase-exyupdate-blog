'use client';

import { BlogCard } from '@/components/reuseable/blog-card';
import { format } from 'date-fns';
import { calculateReadingTime } from '@/utils/helper';
import SkeletonCard from '../reuseable/SkeletonCard';
import ComponentTitle from '../reuseable/component-title';
import { useInfinitePosts } from '@/lib/queries/posts/getAllPosts';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import InfiniteLoadingTrigger from '../reuseable/InfiniteLoadingTrigger';

export default function LatestPostSection() {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfinitePosts(9); // Load 9 posts at a time

  const { ref, inView } = useInView();

  // Trigger fetch when the loader comes into view
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Flatten all posts from all pages
  const allPosts = data?.pages.flatMap(page => page.posts) || [];

  if (error) {
    return (
      <section className="container">
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold">Error loading posts</h2>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="latest-articles-heading" className="container">
      <ComponentTitle title="Latest posts" className="!text-xl font-semibold" description="" link="/posts" />

      {status === 'pending' ? (
        <SkeletonCard />
      ) : !allPosts.length ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No posts available</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {allPosts.map(post => (
              <div key={post._id} className="p-2">
                <BlogCard
                  title={post.title}
                  href={`/posts/${post.slug}`}
                  imageUrl={post.featuredImage?.url}
                  category={post.categories?.[0]?.title}
                  categorySlug={post.categories?.[0]?.slug}
                  date={format(new Date(post.publishedAt), 'MMM d, yyyy')}
                  readingTime={calculateReadingTime(post.excerpt)}
                  excerpt={post.excerpt || ''}
                  authorName={post.author.name}
                />
              </div>
            ))}
          </div>

          <InfiniteLoadingTrigger ref={ref} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
        </>
      )}
    </section>
  );
}
