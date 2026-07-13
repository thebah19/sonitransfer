import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'light';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-gold text-white shadow-lg shadow-gold/25 hover:bg-[#d96b22]',
  secondary: 'bg-navy text-white shadow-lg shadow-navy/20 hover:bg-[#234783]',
  outline: 'border border-navy/25 bg-white text-navy hover:border-gold hover:bg-orange-50',
  ghost: 'text-navy hover:bg-slate-50',
  light: 'bg-white text-navy hover:bg-slate-50'
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: ButtonVariant;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, variant = 'primary', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-60',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
