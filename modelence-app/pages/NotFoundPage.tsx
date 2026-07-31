import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import Page from '@/client/components/Page';

export default function NotFoundPage() {
  return (
    <Page seo={{ title: 'Страница не найдена', noindex: true }}>
      <div className="flex min-h-full items-center justify-center py-16">
        <div className="panel animate-slide-up max-w-md p-8 text-center">
          <Compass className="mx-auto size-8 text-ember-500" aria-hidden="true" />
          <p className="mt-3 font-display text-5xl leading-none font-bold text-mist-50">404</p>
          <h1 className="mt-3 font-display text-lg font-semibold tracking-[0.1em] uppercase text-mist-50">
            Страница не найдена
          </h1>
          <p className="mt-2 text-sm text-mist-400">
            Такой страницы нет — возможно, ссылка устарела.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-1.5 rounded-md border border-ember-500/60 bg-ember-600/15 px-4 py-2 text-[12px] font-semibold tracking-[0.08em] uppercase text-ember-400 transition-all duration-200 hover:bg-ember-600/30"
          >
            К драфту
          </Link>
        </div>
      </div>
    </Page>
  );
}

