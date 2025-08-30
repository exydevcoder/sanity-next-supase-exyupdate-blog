import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsService, SortOrder } from '@/lib/queries/comments/comments';
import { toast } from 'sonner';

export const useComments = (postId: string, sortOrder: SortOrder = 'latest') => {
  const queryClient = useQueryClient();

  // Get comments
  const {
    data: comments = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['comments', postId, sortOrder],
    queryFn: () => commentsService.getPostComments(postId, sortOrder),
    enabled: !!postId
  });

  // Add comment
  const addComment = useMutation({
    mutationFn: (content: string) => commentsService.addComment(postId, content),
    onSuccess: () => {
      // Invalidate all comment queries for this post regardless of sort order
      queryClient.invalidateQueries({ 
        queryKey: ['comments', postId],
        exact: false 
      });
      toast.success('Comment added!');
    },
    onError: () => {
      toast.error('Failed to add comment');
    }
  });

  // Delete comment
  const deleteComment = useMutation({
    mutationFn: (commentId: string) => commentsService.deleteComment(commentId),
    onSuccess: () => {
      // Invalidate all comment queries for this post regardless of sort order
      queryClient.invalidateQueries({ 
        queryKey: ['comments', postId],
        exact: false 
      });
      toast.success('Comment deleted');
    },
    onError: () => {
      toast.error('Failed to delete comment');
    }
  });

  return {
    comments,
    isLoading,
    error,
    addComment: addComment.mutate,
    deleteComment: deleteComment.mutate,
    isAddingComment: addComment.isPending,
    isDeletingComment: deleteComment.isPending
  };
};