// lib/queries/comments/comments.ts
import { createClient } from '@/lib/supabase/client';

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  full_name: string | null;
  avatar_url: string | null;
}

export type SortOrder = 'latest' | 'oldest';

export const commentsService = {
  // Get comments for a post with optional sorting
  async getPostComments(postId: string, sortOrder: SortOrder = 'latest'): Promise<Comment[]> {
    const supabase = createClient();
    
    try {
      const ascending = sortOrder === 'oldest';
      
      const { data: comments, error } = await supabase
        .from('comments_with_profiles')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending });

      if (error) {
        console.error('Comments query error:', error);
        throw error;
      }

      if (!comments || comments.length === 0) {
        return [];
      }

      return comments;

    } catch (error) {
      console.error('Error in getPostComments:', error);
      throw error;
    }
  },

  // Add a new comment
  async addComment(postId: string, content: string): Promise<void> {
    const supabase = createClient();
    
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('User auth error:', userError);
        throw new Error('Authentication error');
      }

      if (!user) {
        throw new Error('You must be logged in to comment');
      }

      const { data, error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          content: content.trim(),
          user_id: user.id
        })
        .select();

      if (error) {
        console.error('Insert error:', error);
        throw error;
      }


    } catch (error) {
      console.error('Error in addComment:', error);
      throw error;
    }
  },

  // Delete a comment
  async deleteComment(commentId: string): Promise<void> {
    const supabase = createClient();
    
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }

    } catch (error) {
      console.error('Error in deleteComment:', error);
      throw error;
    }
  }
};