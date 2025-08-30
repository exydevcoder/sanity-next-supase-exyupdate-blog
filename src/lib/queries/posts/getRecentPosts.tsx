'use client';

import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/sanityClient';
import { Post } from '@/types/post';

export function useRecentPosts(limit: number = 5) {
  return useQuery({
    queryKey: ['posts', 'recent', limit],
    queryFn: async () => {
      const data = await client.fetch(
        `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) [0...$limit] {
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
            name,
            "slug": slug.current
          },
          categories[]->{
            _id,
            title,
            "slug": slug.current
          }
        }`,
        { limit }
      );
      return data as Post[];
    }
  });
}