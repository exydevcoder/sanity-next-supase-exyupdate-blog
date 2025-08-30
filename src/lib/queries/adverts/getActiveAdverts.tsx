import { client } from '@/lib/sanityClient';
import { Advert } from '@/types/adverts';
import { useQuery } from '@tanstack/react-query';

export async function getActiveAdverts(): Promise<Advert[]> {
  try {
    const adverts = await client.fetch(
      `*[
        _type == "adverts" &&
        isActive == true &&
        startDate <= now() &&
        (endDate == null || endDate >= now())
      ] | order(priority desc, startDate desc) {
        _id,
        title,
        slug,
        advertiser,
        tags,
        adType,
        priority,
        image {
          asset-> {
            _ref,
            url
          },
          hotspot
        },
        altText,
        description,
        clickUrl,
        openInNewTab,
        isActive,
        startDate,
        endDate,
        budget
      }`
    );

    return adverts;
  } catch (error) {
    console.error('Error fetching active adverts:', error);
    throw error;
  }
}

// Hook to use with React Query
export function useActiveAdverts() {
  return useQuery({
    queryKey: ['active-adverts'],
    queryFn: getActiveAdverts
  });
}
