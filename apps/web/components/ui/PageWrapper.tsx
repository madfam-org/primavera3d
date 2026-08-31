import React from 'react';

interface PageWrapperProps {
  variant?: 'default' | 'blueprint-stage' | 'grid';
  children: React.ReactNode;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  variant = 'default',
  children,
  className = '',
}) => {
  const variants = {
    default: 'bp-page',
    'blueprint-stage': 'bp-page blueprint-stage',
    grid: 'bp-page blueprint-grid',
  };

  const pageClass = `${variants[variant]} ${className}`;

  if (variant === 'blueprint-stage') {
    return (
      <main className={pageClass}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/20" />
        <div className="relative">{children}</div>
      </main>
    );
  }

  return <main className={pageClass}>{children}</main>;
};

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '' }) => (
  <section className={`bp-section ${className}`}>
    <div className="bp-container">{children}</div>
  </section>
);

export { PageWrapper, Section };
