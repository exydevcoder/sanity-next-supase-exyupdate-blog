import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/store/dialogs-store';
import React from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';
import { toast } from 'sonner';
import { useFavorites } from '@/hooks/useFavorites'; // Import your useFavorites hook

interface FavoriteButtonProps {
  postId: string;
}

export default function FavoriteButton({ postId }: FavoriteButtonProps) {
  const { onOpen } = useDialog();
  const { isAuthenticated, user } = useAuth();
  const { useIsFavorited, useToggleFavorite } = useFavorites();

  // Get favorite status for this post
  const { data: isFavorited, isLoading: isCheckingFavorite } = useIsFavorited(postId);

  // Get toggle favorite mutation
  const toggleFavoriteMutation = useToggleFavorite();

  const handleFavoriteClick = async () => {
    if (!isAuthenticated || !user) {
      toast.error('Please log in to save this post 📝', {
        action: {
          label: 'Login',
          onClick: () => onOpen('auth')
        }
      });
      return;
    }

    try {
      // Toggle the favorite status
      await toggleFavoriteMutation.mutateAsync({
        postId,
        isCurrentlyFavorited: isFavorited || false
      });

      // Show success message based on the action
      toast.success(isFavorited ? 'You removed this post! 😊' : 'You saved this post! 😊');
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorites');
    }
  };

  return (
    <button
      className={`cursor-pointer transition-colors ${isFavorited ? 'text-black' : 'text-black'}`}
      onClick={handleFavoriteClick}
      disabled={isCheckingFavorite || toggleFavoriteMutation.isPending}
    >
      {isFavorited ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
    </button>
  );
}
