import { client } from '@/lib/sanityClient';
import { PostBySlugResponse } from '@/types/post';
import { useQuery } from '@tanstack/react-query';

export async function getPostBySlug(slug: string): Promise<PostBySlugResponse | null> {
  const data = await client.fetch(
    `*[_type == "post" && slug.current == $slug && defined(publishedAt)][0] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      "featuredImage": {
        "url": featuredImage.asset->url,
        "alt": featuredImage.alt,
        "hotspot": featuredImage.hotspot,
        "crop": featuredImage.crop
      },
      author->{
        _id,
        name,
        "slug": slug.current,
        "image": image.asset->url,
        bio
      },
      categories[]->{
        _id,
        title,
        "slug": slug.current,
        description
      },
      body
    }`,
    { slug },
    { next: { tags: ['post', slug] } }
  );
  
  return data as PostBySlugResponse | null;
}

// Hook for using in components
export function usePostBySlug(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug, // Only run query if slug exists
  });
}