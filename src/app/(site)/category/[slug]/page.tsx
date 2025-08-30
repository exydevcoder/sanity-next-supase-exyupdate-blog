'use client';

import { useParams } from 'next/navigation';
import { useInfinitePostsByCategory } from '@/lib/queries/posts/getPostsByCategory';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ChevronRight, Home } from 'lucide-react';
import { useCategoryBySlug } from '@/lib/queries/posts/getCategoryBySlug';
import ComponentTitle from '@/components/reuseable/component-title';
import { BlogCard } from '@/components/reuseable/blog-card';
import { calculateReadingTime } from '@/utils/helper';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import SkeletonCard from '@/components/reuseable/SkeletonCard';
import InfiniteLoadingTrigger from '@/components/reuseable/InfiniteLoadingTrigger';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.slug as string;

  // Fetch category details
  const { data: categoryData, isLoading: categoryLoading, error: categoryError } = useCategoryBySlug(categorySlug);

  // Fetch posts for this category with infinite scroll
  const { data: postsData, isLoading: postsLoading, error: postsError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinitePostsByCategory(categorySlug, 6); // Load 6 posts at a time

  // Set up intersection observer for infinite scroll
  const { ref, inView } = useInView();

  // Trigger fetch when the loader comes into view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (categoryLoading || postsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (categoryError || postsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Error loading category</h1>
          <p className="text-gray-600 mt-2">Please try again later.</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Category not found</h1>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const allPosts = postsData?.pages.flatMap(page => page.posts) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 text-sm text-gray-600">
          <ol className="list-none p-0 inline-flex items-center">
            <li className="flex items-center">
              <Link href="/" className="hover:text-gray-800 font-medium flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
            </li>
            <li className="flex items-center">
              {categoryData.parent && (
                <>
                  <ChevronRight className="w-3 h-3 mx-2" />
                  <Link href={`/categories/${categoryData.parent.slug}`} className="hover:text-blue-600">
                    {categoryData.parent.title}
                  </Link>
                </>
              )}
              <ChevronRight className="w-3 h-3 mx-2" />
            </li>
            <li className="flex items-center">
              <span className="text-gray-900 font-medium">{categoryData.title}</span>
            </li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {categoryData.imageUrl && (
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <Image src={categoryData.imageUrl} alt={categoryData.alt || categoryData.title} fill className="object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Posts Grid */}
        {categoryLoading || postsLoading ? (
          <SkeletonCard count={6} className="grid grid-cols-3 gap-3" cols={{ default: 3 }} />
        ) : allPosts.length > 0 ? (
          <>
            <ComponentTitle title={`${categoryData.title}`} className="!text-3xl font-semibold" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.map(post => (
                <div key={post._id} className="">
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts found in this category.</p>
            <Link href="/posts" className="text-blue-600 hover:underline mt-4 inline-block">
              Browse all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
