import { createClient } from '@/lib/supabase/client';

export interface Favorite {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
}

export const favoritesService = {
  // Add a post to favorites
  async addFavorite(userId: string, postId: string): Promise<Favorite> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('favorites')
      .insert({ user_id: userId, post_id: postId })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Remove a post from favorites
  async removeFavorite(userId: string, postId: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('post_id', postId);

    if (error) throw error;
  },

  // Check if a post is favorited by user
  async isPostFavorited(userId: string, postId: string): Promise<boolean> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('post_id', postId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows found"
      throw error;
    }

    return !!data;
  },

  // Get user's favorite posts
  async getUserFavorites(userId: string): Promise<Favorite[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
};