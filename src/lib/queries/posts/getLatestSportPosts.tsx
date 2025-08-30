'use client';

import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/sanityClient';
import { Post } from '@/types/post';

// Hook to fetch latest sport posts
export function useLatestSportPosts(limit: number = 6) {
  return useQuery({
    queryKey: ['posts', 'sport-category', limit],
    queryFn: async () => {
      const data = await client.fetch(
        `*[_type == "post" && defined(publishedAt) && "sport" in categories[]->slug.current] | order(publishedAt desc) [0...$limit] {
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
        }`,
        { limit }
      );
      return data as Post[];
    },
  });
}