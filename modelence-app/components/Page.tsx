/**
 * Page wrapper template to be used as a base for all pages.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from 'modelence/client';
import LoadingSpinner from '@/client/components/LoadingSpinner';
import { Swords } from 'lucide-react';
import { Seo, type SeoProps } from '@/client/components/Seo';
import { cn } from '@/client/lib/utils';

interface PageProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  /** Per-page <head> overrides (title, description, OG image, etc). */
  seo?: SeoProps;
}

function Header() {
  const { user } = useSession();

  const linkClass =
    'rounded-md border border-void-700 px-3 py-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase text-mist-400 transition-all duration-200 hover:border-ember-500/60 hover:text-ember-400';

  return (
    <header className="sticky top-0 z-30 border-b border-void-750 bg-void-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-3 py-2.5 sm:px-5">
        <Link to="/" className="group flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md border border-ember-500/40 bg-ember-500/10 transition-colors duration-200 group-hover:bg-ember-500/20">
            <Swords className="size-3.5 text-ember-500" aria-hidden="true" />
          </span>
          <span className="font-display text-sm font-bold tracking-[0.14em] uppercase text-mist-50">
            Counter<span className="text-ember-500">Web</span>
          </span>
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-mist-400 sm:inline">{user.handle}</span>
            <Link to="/logout" className={linkClass}>
              Выйти
            </Link>
          </div>
        ) : (
          <Link to="/login" className={linkClass}>
            Войти
          </Link>
        )}
      </div>
    </header>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-screen max-w-full overflow-x-hidden">{children}</div>;
}

function PageBody({ children, className, isLoading = false }: PageProps) {
  return (
    <div className="flex flex-1 w-full min-h-0">
      <main className={cn("flex flex-col flex-1 p-4 space-y-4 overflow-x-hidden", className)}>
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <LoadingSpinner />
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}

export default function Page({ children, className, isLoading = false, seo }: PageProps) {
  return (
    <PageWrapper>
      <Seo {...seo} />
      <Header />
      <PageBody className={className} isLoading={isLoading}>{children}</PageBody>
    </PageWrapper>
  );
}

