// hooks/useAvatarUpload.ts
import { useState } from 'react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export function useAvatarUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const { user, refreshProfile } = useAuth();
  const supabase = createClient();

  const uploadAvatar = async (file: File) => {
    if (!user || !file) return null;

    setIsUploading(true);

    try {
      // Simple file validation
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return null;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return null;
      }

      // Delete existing avatar if it exists
      const existingAvatarUrl = user.user_metadata?.avatar_url;
      if (existingAvatarUrl) {
        try {
          // Extract the file path from the existing URL
          const url = new URL(existingAvatarUrl);
          const pathParts = url.pathname.split('/');
          const fileName = pathParts[pathParts.length - 1];
          const filePath = `${user.id}/${fileName}`;

          await supabase.storage.from('avatars').remove([filePath]);

          console.log('Deleted existing avatar:', filePath);
        } catch (deleteError) {
          console.warn('Failed to delete existing avatar:', deleteError);
          // Continue with upload even if deletion fails
        }
      }

      // Upload new file
      const fileName = `${user.id}/${Date.now()}.${file.name.split('.').pop()}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error('Upload failed: ' + errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadAvatar, isUploading };
}
