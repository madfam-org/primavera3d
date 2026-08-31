'use client';

import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@repo/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg';

    const variants = {
      primary: 'bg-blueprint-blue text-white hover:bg-blueprint-blue/80 focus:ring-blueprint-blue',
      secondary: 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-600',
      outline:
        'border-2 border-blueprint-blue text-blueprint-light hover:bg-blueprint-blue/10 focus:ring-blueprint-blue',
      ghost: 'text-gray-400 hover:text-white hover:bg-gray-800/50 focus:ring-gray-600',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
