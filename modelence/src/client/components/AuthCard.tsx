import React from 'react';
import { Swords } from 'lucide-react';
import { cn } from '@/client/lib/utils';

export const authLabelClass =
  'mb-1 block text-[11px] font-semibold tracking-[0.08em] uppercase text-mist-400';
export const authFieldClass =
  'w-full rounded-md border border-void-700 bg-void-900 px-3 py-2 text-sm text-mist-50 transition-colors duration-200 placeholder:text-mist-600 focus:border-ember-500/70 focus:ring-1 focus:ring-ember-500/30 focus:outline-none';
export const authButtonClass =
  'w-full rounded-md bg-ember-500 px-4 py-2 text-[12px] font-bold tracking-[0.1em] uppercase text-void-950 transition-all duration-200 hover:bg-ember-400 hover:shadow-[0_0_20px_-6px_rgba(255,122,47,0.8)]';

interface AuthCardProps {
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export default function AuthCard({ title, subtitle, footer, children }: AuthCardProps) {
  return (
    <div className="panel animate-slide-up w-full max-w-sm p-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="flex size-10 items-center justify-center rounded-lg border border-ember-500/40 bg-ember-500/10">
          <Swords className="size-5 text-ember-500" aria-hidden="true" />
        </span>
        <h1 className="mt-2 font-display text-xl font-bold tracking-[0.06em] uppercase text-mist-50">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-mist-400">{subtitle}</p>}
      </div>

      <div className={cn('mt-5', footer && 'border-b border-void-750 pb-5')}>{children}</div>

      {footer && <div className="mt-4 text-center text-xs text-mist-400">{footer}</div>}
    </div>
  );
}
