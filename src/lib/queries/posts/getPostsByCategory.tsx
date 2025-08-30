// lib/queries/posts/getPostsByCategory.ts
import { client } from '@/lib/sanityClient';
import { PostsResponse } from '@/types/post';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

export async function getPostsByCategory(categorySlug: string, limit: number = 20, offset: number = 0): Promise<PostsResponse> {
  const data = await client.fetch(
    `{
      "posts": *[_type == "post" && defined(publishedAt) && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(publishedAt desc) [$offset...$offset + $limit] {
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        excerpt,
        "featuredImage": {
          "url": featuredImage.asset->url,
          "alt": featuredImage.alt
        },
        author->{
          _id,
          name,
          "slug": slug.current,
          "image": image.asset->url
        },
        categories[]->{
          _id,
          title,
          "slug": slug.current
        }
      },
      "total": count(*[_type == "post" && defined(publishedAt) && references(*[_type == "category" && slug.current == $categorySlug]._id)]),
      "hasMore": count(*[_type == "post" && defined(publishedAt) && references(*[_type == "category" && slug.current == $categorySlug]._id)]) > $offset + $limit
    }`,
    { offset, limit, categorySlug },
    { next: { tags: ['posts'] } }
  );
  return data as PostsResponse;
}

// Regular hook for pagination
export function usePostsByCategory(categorySlug: string, limit: number = 20, offset: number = 0) {
  return useQuery({
    queryKey: ['posts', 'byCategory', categorySlug, { limit, offset }],
    queryFn: () => getPostsByCategory(categorySlug, limit, offset),
    enabled: !!categorySlug,
    placeholderData: (previousData) => previousData,
  });
}

// NEW: Hook for infinite scroll by category
export function useInfinitePostsByCategory(categorySlug: string, limit: number = 10) {
  return useInfiniteQuery({
    queryKey: ['posts', 'infiniteByCategory', categorySlug],
    queryFn: ({ pageParam = 0 }) => getPostsByCategory(categorySlug, limit, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // Calculate the next offset
      const nextOffset = allPages.length * limit;
      
      // Check if there are more posts to load
      if (lastPage.hasMore) {
        return nextOffset;
      }
      
      // Return undefined to indicate no more pages
      return undefined;
    },
    initialPageParam: 0,
    enabled: !!categorySlug,
  });
}