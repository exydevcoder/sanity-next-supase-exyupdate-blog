// components/auth/SignInForm.tsx
import { InputField } from '@/components/reuseable/input-field';
import { Button } from '@/components/ui/button';
import { inputClass } from './style';
import { Loader2 } from 'lucide-react';

type SignInValues = { email: string; password: string };

interface SignInFormProps {
  values: SignInValues;
  errors: Partial<Record<keyof SignInValues, string>>;
  setValue: (fn: (prev: SignInValues) => SignInValues) => void;
  validate: () => boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onForgotPassword: () => void;
  isLoading?: boolean;
}

export function SignInForm({ values, errors, setValue, validate, onSubmit, onForgotPassword, isLoading = false }: SignInFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <InputField
        id="signin-email"
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
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="signin-password" className="text-sm font-medium">
            Password
          </label>
          <button type="button" onClick={onForgotPassword} className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground cursor-pointer">
            Forgot password?
          </button>
        </div>
        <InputField
          id="signin-password"
          label=""
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={values.password}
          onChange={v => setValue(prev => ({ ...prev, password: v }))}
          onBlur={validate}
          error={errors.password}
          className={inputClass}
          containerClassName="space-y-0"
          disabled={isLoading}
        />
      </div>
      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Login...
          </>
        ) : (
          'Login'
        )}
      </Button>
    </form>
  );
}
