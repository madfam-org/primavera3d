'use client';

import { ReactNode, HTMLAttributes, forwardRef } from 'react';
import { cn } from '@repo/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-gray-900 border border-gray-800',
      outlined: 'border-2 border-gray-700 bg-transparent',
      elevated: 'bg-gray-900 shadow-xl shadow-blueprint-blue/10',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-lg p-6 transition-all', variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ children, className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-xl font-semibold', className)} {...props}>
      {children}
    </h3>
  )
);

CardTitle.displayName = 'CardTitle';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('text-gray-400', className)} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';
