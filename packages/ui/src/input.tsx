'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@repo/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'filled';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-transparent border border-gray-700 focus:border-blueprint-blue',
      filled: 'bg-gray-800 border border-transparent focus:bg-gray-700',
    };

    return (
      <input
        ref={ref}
        className={cn(
          'w-full px-4 py-2 rounded-lg text-white placeholder-gray-500',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-blueprint-blue/50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
