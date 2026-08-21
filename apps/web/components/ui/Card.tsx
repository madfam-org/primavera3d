import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  variant?: 'default' | 'interactive' | 'minimal' | 'hero';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ variant = 'default', children, className = '', onClick }) => {
  const baseClass = 'bp-card-base';

  const variants = {
    default: '',
    interactive: 'bp-card-interactive cursor-pointer',
    minimal: 'blueprint-sheet bg-opacity-50',
    hero: 'neon-border pulse-glow',
  };

  const cardClass = `${baseClass} ${variants[variant]} ${className}`;

  if (variant === 'interactive') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={cardClass}
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cardClass}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
