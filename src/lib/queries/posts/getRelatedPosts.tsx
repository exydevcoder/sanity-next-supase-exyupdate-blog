import { client } from '@/lib/sanityClient';
import { Post } from '@/types/post';
import { useQuery } from '@tanstack/react-query';

export async function getRelatedPosts(
  currentPostId: string,
  categoryIds: string[],
  limit: number = 3
): Promise<Post[]> {
  const data = await client.fetch(
    `*[_type == "post" && _id != $currentPostId && defined(publishedAt) && (count(categories[@._ref in $categoryIds]) > 0)] | order(publishedAt desc) [0...$limit] {
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
    { currentPostId, categoryIds, limit },
    { next: { tags: ['posts', 'related'] } }
  );
  return data as Post[];
}

export function useRelatedPosts(currentPostId: string, categoryIds: string[], limit: number = 3) {
  return useQuery({
    queryKey: ['posts', 'related', currentPostId],
    queryFn: () => getRelatedPosts(currentPostId, categoryIds, limit),
    enabled: !!currentPostId && categoryIds.length > 0,
  });
}