import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    | 'onAnimationStart'
    | 'onAnimationEnd'
    | 'onAnimationIteration'
    | 'onDrag'
    | 'onDragStart'
    | 'onDragEnd'
  > {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  href?: string;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'left',
      loading = false,
      href,
      className = '',
      children,
      disabled,
      ...restProps
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-lg bp-transition-normal focus:outline-none focus:ring-2 focus:ring-blueprint-blue focus:ring-offset-2 focus:ring-offset-blueprint-dark disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-blueprint-blue text-white hover:bg-blueprint-blue/90 hover:shadow-lg hover:shadow-blueprint-blue/25',
      secondary: 'bg-white/10 text-white border-2 border-white backdrop-blur-sm hover:bg-white/20',
      outline:
        'border-2 border-blueprint-blue text-blueprint-blue hover:bg-blueprint-blue hover:text-white',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    const content = (
      <>
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2" />
        ) : (
          Icon && iconPosition === 'left' && <Icon className="h-5 w-5 mr-2" />
        )}
        {children}
        {!loading && Icon && iconPosition === 'right' && <Icon className="h-5 w-5 ml-2" />}
      </>
    );

    if (href) {
      return (
        <motion.a
          href={href}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={buttonClass}
        >
          {content}
        </motion.a>
      );
    }

    const motionProps = {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
    };

    return (
      <motion.button
        ref={ref}
        {...motionProps}
        disabled={disabled || loading}
        className={buttonClass}
        {...restProps}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
