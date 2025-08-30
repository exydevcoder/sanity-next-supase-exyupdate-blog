// Updated SignUpForm.tsx with loading state
import { InputField } from '../reuseable/input-field';
import { Button } from '../ui/button';
import { inputClass } from './style';
import { Loader2 } from 'lucide-react';

type SignUpValues = { name: string; email: string; password: string };

interface SignUpFormProps {
  values: SignUpValues;
  errors: Partial<Record<keyof SignUpValues, string>>;
  setValue: (fn: (prev: SignUpValues) => SignUpValues) => void;
  validate: () => boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

export function SignUpForm({ values, errors, setValue, validate, onSubmit, isLoading = false }: SignUpFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <InputField
        id="signup-name"
        label="Full Name"
        placeholder="Jane Doe"
        autoComplete="fullName"
        value={values.name}
        onChange={v => setValue(prev => ({ ...prev, name: v }))}
        onBlur={validate}
        error={errors.name}
        className={inputClass}
        disabled={isLoading}
      />
      <InputField
        id="signup-email"
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
      <InputField
        id="signup-password"
        label="Password"
        type="password"
        placeholder="At least 8 characters"
        autoComplete="new-password"
        value={values.password}
        onChange={v => setValue(prev => ({ ...prev, password: v }))}
        onBlur={validate}
        error={errors.password}
        hint="Must include a letter, a number, and a special character."
        className={inputClass}
        disabled={isLoading}
      />
      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          'Create account'
        )}
      </Button>
    </form>
  );
}
