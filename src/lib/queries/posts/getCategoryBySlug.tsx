import { client } from '@/lib/sanityClient';
import { GetCategoryBySlugResponse } from '@/types/category';
import { useQuery } from '@tanstack/react-query';

export async function getCategoryBySlug(slug: string): Promise<GetCategoryBySlugResponse> {
  const data = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      imageUrl,
      alt,
      description,
      parent->{
        _id,
        title,
        "slug": slug.current
      },
      "subcategories": *[_type == "category" && references(^._id)] {
        _id,
        title,
        "slug": slug.current,
        imageUrl,
        alt,
        description
      }
    }`,
    { slug },
    { next: { tags: ['category', slug] } }
  );
  
  return data as GetCategoryBySlugResponse;
}


export function useCategoryBySlug(slug: string) {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => getCategoryBySlug(slug),
    enabled: !!slug,
  });
}