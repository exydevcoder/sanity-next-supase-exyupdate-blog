import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { FcGoogle } from 'react-icons/fc';

export default function SocialAuthBtns() {
  const supabase = createClient();

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`,
        },
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="mt-6 space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <Button
        variant="outline"
        className="w-full"
        onClick={signInWithGoogle}
        type="button"
      >
        <FcGoogle className="h-4 w-4 mr-2" />
        Google
      </Button>
    </div>
  );
}