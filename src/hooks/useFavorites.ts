// hooks/useFavorites.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { favoritesService } from '@/lib/queries/supabase/favorites/favorites';

export const useFavorites = () => {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Check if a specific post is favorited
  const useIsFavorited = (postId: string) => {
    return useQuery({
      queryKey: ['favorites', 'isFavorited', postId, user?.id],
      queryFn: () => {
        if (!user?.id || !postId) return false;
        return favoritesService.isPostFavorited(user.id, postId);
      },
      enabled: !!user?.id && !!postId && isAuthenticated,
    });
  };

  // Get all user favorites
  const useUserFavorites = () => {
    return useQuery({
      queryKey: ['favorites', 'user', user?.id],
      queryFn: () => {
        if (!user?.id) return [];
        return favoritesService.getUserFavorites(user.id);
      },
      enabled: !!user?.id && isAuthenticated,
    });
  };

  // Toggle favorite mutation
  const useToggleFavorite = () => {
    return useMutation({
      mutationFn: async ({ postId, isCurrentlyFavorited }: { 
        postId: string; 
        isCurrentlyFavorited: boolean; 
      }) => {
        if (!user?.id) throw new Error('User not authenticated');
        
        if (isCurrentlyFavorited) {
          await favoritesService.removeFavorite(user.id, postId);
          return false;
        } else {
          await favoritesService.addFavorite(user.id, postId);
          return true;
        }
      },
      onSuccess: (_, variables) => {
        // Invalidate relevant queries
        queryClient.invalidateQueries({ queryKey: ['favorites', 'isFavorited', variables.postId, user?.id] });
        queryClient.invalidateQueries({ queryKey: ['favorites', 'user', user?.id] });
      },
    });
  };

  return {
    useIsFavorited,
    useUserFavorites,
    useToggleFavorite,
  };
};