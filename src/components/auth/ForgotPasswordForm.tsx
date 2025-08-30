// components/auth/ForgotPasswordForm.tsx
import { Loader2 } from 'lucide-react';
import { InputField } from '../reuseable/input-field';
import { Button } from '../ui/button';
import { inputClass } from './style';

type ForgotPasswordValues = { email: string };

interface ForgotPasswordFormProps {
  values: ForgotPasswordValues;
  errors: Partial<Record<keyof ForgotPasswordValues, string>>;
  setValue: (fn: (prev: ForgotPasswordValues) => ForgotPasswordValues) => void;
  validate: () => boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBackToSignIn: () => void;
  isLoading?: boolean;
}

export function ForgotPasswordForm({ values, errors, setValue, validate, onSubmit, onBackToSignIn, isLoading = false }: ForgotPasswordFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <InputField
        id="forgot-email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        value={values.email}
        onChange={v => setValue(prev => ({ ...prev, email: v }))}
        onBlur={validate}
        error={errors.email}
        className={inputClass}
        disabled={isLoading}
      />
      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send reset link'
        )}
      </Button>
      <div className="text-center">
        <button type="button" onClick={onBackToSignIn} className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground">
          Back to sign in
        </button>
      </div>
    </form>
  );
}
