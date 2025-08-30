// hooks/useAuthForms.ts
import { useState } from 'react';
import { toast } from 'sonner';
import { signInSchema, signUpSchema, forgotPasswordSchema } from '@/lib/auth-schemas';
import { createClient } from '@/lib/supabase/client';

type FieldErrors<T extends Record<string, unknown>> = Partial<Record<keyof T, string>>;
type TabType = 'sign-in' | 'sign-up' | 'forgot-password';
type SignInValues = { email: string; password: string };
type SignUpValues = { name: string; email: string; password: string };
type ForgotPasswordValues = { email: string };

export function useAuthForms() {
  // Form states
  const [siValues, setSiValues] = useState<SignInValues>({ email: '', password: '' });
  const [siErrors, setSiErrors] = useState<FieldErrors<SignInValues>>({});
  const [suValues, setSuValues] = useState<SignUpValues>({ name: '', email: '', password: '' });
  const [suErrors, setSuErrors] = useState<FieldErrors<SignUpValues>>({});
  const [fpValues, setFpValues] = useState<ForgotPasswordValues>({ email: '' });
  const [fpErrors, setFpErrors] = useState<FieldErrors<ForgotPasswordValues>>({});
  const supabase = createClient();

  // Loading states
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);

  // Validation functions
  const validateSignIn = (): boolean => {
    const result = signInSchema.safeParse(siValues);
    if (result.success) {
      setSiErrors({});
      return true;
    }
    const next: FieldErrors<SignInValues> = {};
    for (const issue of result.error.issues) {
      const k = issue.path[0] as keyof SignInValues;
      next[k] = issue.message;
    }
    setSiErrors(next);
    return false;
  };

  const validateSignUp = (): boolean => {
    const result = signUpSchema.safeParse(suValues);
    if (result.success) {
      setSuErrors({});
      return true;
    }
    const next: FieldErrors<SignUpValues> = {};
    for (const issue of result.error.issues) {
      const k = issue.path[0] as keyof SignUpValues;
      next[k] = issue.message;
    }
    setSuErrors(next);
    return false;
  };

  const validateForgotPassword = (): boolean => {
    const result = forgotPasswordSchema.safeParse(fpValues);
    if (result.success) {
      setFpErrors({});
      return true;
    }
    const next: FieldErrors<ForgotPasswordValues> = {};
    for (const issue of result.error.issues) {
      const k = issue.path[0] as keyof ForgotPasswordValues;
      next[k] = issue.message;
    }
    setFpErrors(next);
    return false;
  };

  // Submit handlers
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>, onClose: () => void): Promise<string | void> => {
    e.preventDefault();
    if (!validateSignIn()) return;

    setIsSignInLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: siValues.email,
        password: siValues.password
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid credentials', { description: 'Please check your email and password' });
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('Email not verified', { description: 'Please check your email for verification link' });
        } else {
          toast.error('Sign in failed', { description: error.message });
        }
        return;
      }

      // Clear form on successful sign in
      setSiValues({ email: '', password: '' });
      setSiErrors({});

      toast.success('Welcome back!', { description: `Signed in as ${data.user?.email}` });
      onClose();
    } catch {
      toast.error('Connection error', { description: 'Please try again' });
    } finally {
      setIsSignInLoading(false);
    }
  };

 const handleSignUp = async (e: React.FormEvent<HTMLFormElement>, onClose: () => void): Promise<string | void> => {
  e.preventDefault();
  
  if (!validateSignUp()) return;

  setIsSignUpLoading(true);

  try {
    const { data, error } = await supabase.auth.signUp({
      email: suValues.email,
      password: suValues.password,
      options: {
        data: { full_name: suValues.name }
      }
    });

    if (error) {
      if (error.message.includes('already registered') || error.message.includes('already in use')) {
        setSuValues({ name: '', email: '', password: '' });
        setSuErrors({});
        toast.error('Account already exists', { description: 'Try signing in instead' });
        return 'switch-to-signin';
      }
      toast.error('Sign up failed', { description: error.message });
      return;
    }

    // Store values before clearing
    const userName = suValues.name;
    const userEmail = suValues.email;
    
    // Clear form
    setSuValues({ name: '', email: '', password: '' });
    setSuErrors({});

    // Since you mentioned email confirmation is OFF, this should go to the else branch
    if (data.user && !data.user.email_confirmed_at) {
      toast.success('Check your email!', {
        description: `We sent a verification link to ${userEmail}. Please verify to complete signup.`,
        duration: 8000
      });
    } else {
      toast.success('Account created!', {
        description: `Welcome to the community, ${userName}!`
      });
      onClose();
    }
  } catch {
    toast.error('Something went wrong', { description: 'Please try again' });
  } finally {
    setIsSignUpLoading(false);
  }
};

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>, setTab: (tab: TabType) => void): Promise<void> => {
    e.preventDefault();
    if (!validateForgotPassword()) return;

    setIsForgotPasswordLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(fpValues.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });

      if (error) {
        toast.error('Reset failed', { description: error.message });
        return;
      }

      toast.success('Reset link sent!', {
        description: `Check ${fpValues.email} for password reset instructions.`
      });
      setFpValues({ email: '' });
      setTab('sign-in');
    } catch {
      toast.error('Something went wrong', { description: 'Please try again' });
    } finally {
      setIsForgotPasswordLoading(false);
    }
  };

  return {
    signIn: {
      values: siValues,
      errors: siErrors,
      setValue: setSiValues,
      validate: validateSignIn,
      submit: handleSignIn,
      isLoading: isSignInLoading
    },
    signUp: {
      values: suValues,
      errors: suErrors,
      setValue: setSuValues,
      validate: validateSignUp,
      submit: handleSignUp,
      isLoading: isSignUpLoading
    },
    forgotPassword: {
      values: fpValues,
      errors: fpErrors,
      setValue: setFpValues,
      validate: validateForgotPassword,
      submit: handleForgotPassword,
      isLoading: isForgotPasswordLoading
    }
  };
}
