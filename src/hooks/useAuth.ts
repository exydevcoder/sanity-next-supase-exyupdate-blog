import { useAuthStore } from '@/store/auth-store';
import { createClient } from '@/lib/supabase/client';

export const useAuth = () => {
  const { user, session, isLoading, signOut, setUser } = useAuthStore();

  const refreshProfile = async () => {
    const supabase = createClient();
    try {
      // Get fresh user data from Supabase
      const {
        data: { user: freshUser },
        error
      } = await supabase.auth.getUser();

      if (error) {
        console.error('Error refreshing profile:', error);
        return;
      }

      // Update the user in the store
      setUser(freshUser);
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  return {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.user_metadata?.role === 'admin',
    profile: user?.user_metadata || null,
    signOut,
    refreshProfile
  };
};
