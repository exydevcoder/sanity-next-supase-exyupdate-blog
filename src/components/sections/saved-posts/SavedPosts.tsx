'use client';

import React from 'react';
import { Heart, ExternalLink, Calendar, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { calculateReadingTime } from '@/utils/helper';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/sanityClient';
import SkeletonCard from '@/components/reuseable/SkeletonCard';
import { Post } from '@/types/post';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import ComponentTitle from '@/components/reuseable/component-title';
import { toast } from 'sonner';

export function SavedPosts() {
  const { isAuthenticated, user } = useAuth();
  const { useUserFavorites, useToggleFavorite } = useFavorites();
  const { data: favorites, isLoading: favoritesLoading } = useUserFavorites();
  const toggleFavoriteMutation = useToggleFavorite();
  const queryClient = useQueryClient();

  // Fetch post details for each favorite
  const { data: favoritePosts, isLoading: postsLoading } = useQuery({
    queryKey: ['favorite-posts', favorites?.map(f => f.post_id)],
    queryFn: async (): Promise<Post[]> => {
      if (!favorites || favorites.length === 0) return [];

      // Fetch all favorite posts by their IDs
      const postIds = favorites.map(f => f.post_id);
      const postIdsString = postIds.map(id => `"${id}"`).join(',');

      const query = `*[_type == "post" && _id in [${postIdsString}] && defined(publishedAt)] | order(publishedAt desc) {
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
      }`;

      const data = await client.fetch(query);
      return data || [];
    },
    enabled: !!favorites && favorites.length > 0 && isAuthenticated
  });

  const isLoading = favoritesLoading || postsLoading;

  const handleRemoveFavorite = async (postId: string) => {
    if (!user?.id) {
      toast.error('Please log in to manage favorites');
      return;
    }

    try {
      await toggleFavoriteMutation.mutateAsync({
        postId,
        isCurrentlyFavorited: true // Since we're removing, it's currently favorited
      });

      toast.success('Removed from saved posts');

      // Invalidate the favorites queries to refresh the list
      queryClient.invalidateQueries({ queryKey: ['favorites', 'user', user.id] });
      queryClient.invalidateQueries({ queryKey: ['favorite-posts'] });
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove from saved posts');
    }
  };

  return (
    <div className="container space-y-4 sm:space-y-6">
      <ComponentTitle title="Saved Posts" className="!text-xl font-semibold" />

      {isLoading ? (
        <SkeletonCard count={6} className="grid grid-cols-3 gap-3" cols={{ default: 3 }} />
      ) : !favoritePosts || favoritePosts.length === 0 ? (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-lg border p-6 sm:p-8 text-center">
            <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium mb-2">No saved posts yet</h3>
            <p className="text-muted-foreground text-sm sm:text-base">Your saved posts will appear here when you start saving them.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritePosts.map(post => (
            <div key={post._id} className="bg-white rounded-lg border p-4 space-y-3">
              <div className="flex gap-3">
                <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                  {post.featuredImage?.url ? (
                    <Image src={post.featuredImage.url} alt={post.featuredImage.alt || post.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No image</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2 min-w-0">
                  <Link href={`/posts/${post.slug}`} className="font-medium line-clamp-2 transition-colors">
                    {post.title}
                  </Link>
                  {post.excerpt && <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 max-w-max items-start gap-2 text-xs text-muted-foreground">
                <div className="flex max-w-max items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex max-w-max items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{calculateReadingTime(post.excerpt)}</span>
                </div>
                <div className="flex max-w-max items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{post.author.name}</span>
                </div>
                {post.categories?.[0] && (
                  <div className="flex items-center gap-1">
                    <Badge variant="secondary" className="text-xs">
                      {post.categories[0].title}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/posts/${post.slug}`}>
                    Read Article <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleRemoveFavorite(post._id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
