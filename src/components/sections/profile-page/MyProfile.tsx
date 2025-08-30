'use client';

import React, { useState, useRef } from 'react';
import { Edit, Save, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useAvatarUpload } from '@/hooks/useAvatarUpload';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { UserAvatar } from '@/components/reuseable/UserAvatar';
import ProfileSkeleton from './ProfileSkeleton';
import ComponentTitle from '@/components/reuseable/component-title';

export function MyProfile() {
  const { user, profile, isLoading, refreshProfile } = useAuth();
  const { uploadAvatar, isUploading } = useAvatarUpload();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleEditProfile = () => {
    setFullName(profile?.full_name || '');
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsEditDialogOpen(true);
  };

  const handleUpdateProfile = async () => {
  if (!user) return;

  setIsUpdating(true);

  try {
    let avatarUrl = profile?.avatar_url;

    // Upload avatar if a new file was selected
    if (selectedFile) {
      const uploadedUrl = await uploadAvatar(selectedFile);
      if (uploadedUrl) {
        avatarUrl = uploadedUrl;
      } else {
        setIsUpdating(false);
        return; // Upload failed, don't continue
      }
    }

    // Update user metadata (for auth purposes)
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        avatar_url: avatarUrl
      }
    });

    if (authError) {
      toast.error('Update failed', { description: authError.message });
      return;
    }

    // Update the profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (profileError) {
      toast.error('Profile update failed', { description: profileError.message });
      return;
    }

    await refreshProfile();
    toast.success('Profile updated!');
    setIsEditDialogOpen(false);
  } catch (error) {
    console.error('Error updating profile:', error);
    toast.error('Something went wrong');
  } finally {
    setIsUpdating(false);
  }
};

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simple validation
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <ComponentTitle title="My Profile" className="!text-xl font-semibold" />
          <Button onClick={handleEditProfile} variant="outline" className="gap-2 w-full sm:w-auto">
            <Edit className="h-4 w-4" />
            <span className="sm:inline">Edit Profile</span>
          </Button>
        </div>

        <div className="bg-white rounded-lg border p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            {isLoading ? (
              <ProfileSkeleton />
            ) : (
              <>
                <UserAvatar fullName={profile?.full_name} avatarUrl={profile?.avatar_url} size="lg" />
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold">{profile?.full_name || 'No name provided'}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">{user?.email}</p>
                </div>
              </>
            )}
          </div>

          <Separator />

          {isLoading ? (
            <ProfileSkeleton showCircle={false} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                <p className="text-sm sm:text-base">{profile?.full_name || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                <p className="text-sm sm:text-base break-all">{user?.email}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium text-muted-foreground">Member Since</Label>
                <p className="text-sm sm:text-base">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'Unknown'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Simple Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your profile picture and name.</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-3">
              <UserAvatar fullName={profile?.full_name} avatarUrl={previewUrl || profile?.avatar_url} size="lg" />
              <Button onClick={() => fileInputRef.current?.click()} variant="outline" size="sm" className="gap-2" type="button">
                <Upload className="h-4 w-4" />
                {selectedFile ? 'Change Image' : 'Select Image'}
              </Button>
              {selectedFile && <p className="text-xs text-muted-foreground">{selectedFile.name} - Ready to upload</p>}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter your full name" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isUpdating}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleUpdateProfile} disabled={isUpdating || isUploading}>
              {isUpdating || isUploading ? (
                'Updating...'
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
