// lib/queries/posts/getAllPosts.ts
'use client';

import { client } from '@/lib/sanityClient';
import { PostsResponse } from '@/types/post';
import { useInfiniteQuery } from '@tanstack/react-query';

// Get all posts with pagination
export async function getAllPosts(limit: number = 20, offset: number = 0): Promise<PostsResponse> {
  const data = await client.fetch(
    `{
      "posts": *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) [$offset...$offset + $limit] {
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
      "total": count(*[_type == "post" && defined(publishedAt)]),
      "hasMore": count(*[_type == "post" && defined(publishedAt)]) > $offset + $limit
    }`,
    { offset, limit },
    { next: { tags: ['posts'] } }
  );
  return data as PostsResponse;
}

// Hook for infinite scroll
export function useInfinitePosts(limit: number = 10) {
  return useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: ({ pageParam = 0 }) => getAllPosts(limit, pageParam),
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
  });
}