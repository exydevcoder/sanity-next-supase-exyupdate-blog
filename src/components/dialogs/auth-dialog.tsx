'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useDialog } from '@/store/dialogs-store';
import { ArrowLeft, LogOutIcon } from 'lucide-react';
import { useAuthForms } from '@/hooks/useAuthForms';
import { SignInForm } from '@/components/auth/SignInForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export function AuthDialog() {
  const { isOpen, type, onClose } = useDialog();
  const [tab, setTab] = React.useState<'sign-in' | 'sign-up' | 'forgot-password'>('sign-in');
  const { signIn, signUp, forgotPassword } = useAuthForms();

  const getDialogTitle = () => {
    switch (tab) {
      case 'sign-in':
        return 'Sign in';
      case 'sign-up':
        return 'Create your account';
      case 'forgot-password':
        return 'Reset your password';
      default:
        return 'Sign in';
    }
  };

  const getDialogDescription = () => {
    switch (tab) {
      case 'sign-in':
        return 'Access your account to comment, save posts, and manage subscriptions.';
      case 'sign-up':
        return 'Join the blog community to comment and subscribe to the newsletter.';
      case 'forgot-password':
        return "Enter your email address and we'll send you a link to reset your password.";
      default:
        return 'Access your account to comment, save posts, and manage subscriptions.';
    }
  };

  if (type !== 'auth') return null;

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="w-[440px]">
        <DialogHeader>
          <DialogTitle>
            {tab === 'forgot-password' && (
              <Button type="button" variant="ghost" size="sm" className="h-auto p-1 -ml-1" onClick={() => setTab('sign-in')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex items-center gap-3 mt-4">
              <Link href="/">
                <LogOutIcon />
              </Link>
              <h1 className="text-xl font-semibold">{getDialogTitle()}</h1>
            </div>
          </DialogTitle>
          <DialogDescription>{getDialogDescription()}</DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={v => setTab(v as typeof tab)} className="w-full px-2 max-h-[450px] overflow-y-auto">
          {tab !== 'forgot-password' && (
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Sign in</TabsTrigger>
              <TabsTrigger value="sign-up">Sign up</TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="sign-in" className="mt-4">
            <SignInForm
              values={signIn.values}
              errors={signIn.errors}
              setValue={signIn.setValue}
              validate={signIn.validate}
              onSubmit={e => signIn.submit(e, onClose)}
              onForgotPassword={() => setTab('forgot-password')}
              isLoading={signIn.isLoading}
            />
          </TabsContent>

          <TabsContent value="sign-up" className="mt-4">
            <SignUpForm
              values={signUp.values}
              errors={signUp.errors}
              setValue={signUp.setValue}
              validate={signUp.validate}
              onSubmit={e => signUp.submit(e, onClose)}
              isLoading={signUp.isLoading}
            />
          </TabsContent>

          <TabsContent value="forgot-password" className="mt-4">
            <ForgotPasswordForm
              values={forgotPassword.values}
              errors={forgotPassword.errors}
              setValue={forgotPassword.setValue}
              validate={forgotPassword.validate}
              onSubmit={e => forgotPassword.submit(e, setTab)}
              onBackToSignIn={() => setTab('sign-in')}
              isLoading={signUp.isLoading}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
