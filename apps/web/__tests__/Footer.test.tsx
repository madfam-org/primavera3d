import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { existsSync } from 'fs';
import { resolve } from 'path';
import Footer from '../components/Footer';

const APP_DIR = resolve(__dirname, '../app');

function routeExists(pathname: string): boolean {
  const dir = pathname === '/' ? APP_DIR : resolve(APP_DIR, `.${pathname}`);
  return existsSync(resolve(dir, 'page.tsx'));
}

describe('Footer', () => {
  it('only links to routes the app serves', () => {
    const { container } = render(<Footer />);
    const internal = Array.from(container.querySelectorAll('a[href^="/"]')).map(
      a => (a.getAttribute('href') ?? '').split('#')[0] ?? ''
    );
    expect(internal.length).toBeGreaterThan(0);
    const missing = internal.filter(href => !routeExists(href));
    expect(missing).toEqual([]);
  });

  it('sends Pricing to the quote page, where prices are shown', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('href', '/quote');
  });

  it('shows a contact address on a domain that receives mail', () => {
    render(<Footer />);
    const mail = screen.getByRole('link', { name: 'support@madfam.io' });
    expect(mail).toHaveAttribute('href', 'mailto:support@madfam.io');
  });
});
