'use client';

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { InputField } from '../reuseable/input-field';
import { toast } from 'sonner';
import { createClient } from '../../lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { inputClass } from './style';
import { z } from 'zod';
import Link from 'next/link';

// Create a reset password schema
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter' })
      .regex(/[0-9]/, { message: 'Contain at least one number' })
      .regex(/[^a-zA-Z0-9]/, { message: 'Contain at least one special character' })
      .trim(),
    confirmPassword: z.string().trim()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const [values, setValues] = useState<ResetPasswordValues>({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ResetPasswordValues, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyResetSession = async () => {
      try {
        // Check if this is a password recovery flow from URL parameters
        const type = searchParams.get('type');
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');

        if (type === 'recovery' && accessToken && refreshToken) {
          // This is a password reset flow from email link
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          if (error) {
            toast.error('Invalid reset link', {
              description: 'This link may have expired. Please request a new one.'
            });
            router.push('/');
            return;
          }

          setIsValidSession(true);
          setIsChecking(false);
          return;
        }

        // Check existing session
        const {
          data: { session },
          error
        } = await supabase.auth.getSession();

        if (error || !session) {
          toast.error('Invalid reset session', {
            description: 'Please request a new password reset link'
          });
          router.push('/');
          return;
        }

        setIsValidSession(true);
      } catch (error) {
        console.error('Session verification error:', error);
        toast.error('Session verification failed');
        router.push('/');
      } finally {
        setIsChecking(false);
      }
    };

    verifyResetSession();
  }, [router, supabase, searchParams]);

  const validateForm = (): boolean => {
    const result = resetPasswordSchema.safeParse(values);

    if (result.success) {
      setErrors({});
      return true;
    }

    const newErrors: Partial<Record<keyof ResetPasswordValues, string>> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof ResetPasswordValues;
      newErrors[field] = issue.message;
    }

    setErrors(newErrors);
    return false;
  };

  const handleFieldChange = (field: keyof ResetPasswordValues, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: values.password
      });

      if (error) {
        toast.error('Reset failed', {
          description: error.message || 'Failed to reset password. Please try again.'
        });
        return;
      }

      toast.success('Password reset successfully!', {
        description: 'Your password has been updated. You can now sign in with your new password.'
      });

      // Clear form
      setValues({ password: '', confirmPassword: '' });
      setErrors({});

      // Sign out the user after password reset to force re-login
      await supabase.auth.signOut();

      // Redirect to sign in page after successful reset
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Something went wrong', {
        description: 'Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className="w-full max-w-md mx-auto p-6 space-y-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-3 text-muted-foreground">Verifying reset session...</span>
        </div>
      </div>
    );
  }

  if (!isValidSession) {
    return (
      <div className="w-full max-w-md mx-auto p-6 space-y-6">
        <div className="text-center text-destructive">
          <p>Invalid or expired reset session</p>
          <button onClick={() => router.push('/')} className="text-primary hover:underline mt-2">
            Request new reset link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-muted-foreground mt-2">Enter your new password below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          id="password"
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          value={values.password}
          onChange={v => handleFieldChange('password', v)}
          error={errors.password}
          disabled={isLoading}
          className={inputClass}
          hint="Must be at least 8 characters with a letter, number, and special character"
        />

        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your new password"
          value={values.confirmPassword}
          onChange={v => handleFieldChange('confirmPassword', v)}
          error={errors.confirmPassword}
          disabled={isLoading}
          className={inputClass}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting password...
            </>
          ) : (
            'Reset Password'
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Remember your password?{' '}
          <Link href="/" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
