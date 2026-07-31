import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { heroes } from '@/shared/dota/heroes';
import { counterWeight } from '@/shared/dota/counters';
import { searchHaystack } from '@/shared/dota/ru';
import { ROLE_LABELS, type Role } from '@/shared/dota/types';
import { cn } from '@/client/lib/utils';
import { HeroImage } from './HeroImage';
import type { Side } from './DraftBoard';

const ROLES: Role[] = ['carry', 'mid', 'offlane', 'support', 'roamer'];

export default function HeroPool({
  allies,
  enemies,
  activeSide,
  onPick,
  onRemove,
  onInspect,
  inspected,
}: {
  allies: string[];
  enemies: string[];
  activeSide: Side;
  onPick: (name: string) => void;
  onRemove: (side: Side, name: string) => void;
  onInspect: (name: string) => void;
  inspected: string | null;
}) {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<Role | null>(null);

  const allySet = useMemo(() => new Set(allies), [allies]);
  const enemySet = useMemo(() => new Set(enemies), [enemies]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return heroes.filter((hero) => {
      if (role && !hero.roles.includes(role)) return false;
      if (!q) return true;
      // Matches Russian or English name, so "пудж" and "pudge" both work.
      return searchHaystack(hero.name).includes(q);
    });
  }, [search, role]);

  return (
    <section className="panel flex flex-col p-3 sm:p-4">
      <header className="mb-3 flex flex-wrap items-center gap-2">
        <h2 className="mr-auto font-display text-[13px] font-semibold tracking-[0.12em] uppercase text-mist-50">
          Все герои
        </h2>
        <span className="label-caps">
          {visible.length} из {heroes.length}
        </span>
      </header>

      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-mist-600"
            aria-hidden="true"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Поиск среди ${heroes.length} героев — по-русски или по-английски…`}
            className="h-9 w-full rounded-md border border-void-700 bg-void-900 pr-8 pl-8 text-sm text-mist-50 transition-colors duration-200 placeholder:text-mist-600 focus:border-ember-500/70 focus:ring-1 focus:ring-ember-500/30 focus:outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-sm p-0.5 text-mist-600 transition-colors duration-200 hover:text-mist-50"
              title="Очистить поиск"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(role === r ? null : r)}
              className={cn(
                'rounded-sm border px-2 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase transition-all duration-200',
                role === r
                  ? 'border-ember-500 bg-ember-500/15 text-ember-400'
                  : 'border-void-700 text-mist-400 hover:border-void-600 hover:text-mist-200'
              )}
            >
              {ROLE_LABELS[r]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid max-h-[540px] grid-cols-3 gap-1.5 overflow-y-auto pr-1 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
        {visible.map((hero, i) => {
          const isAlly = allySet.has(hero.name);
          const isEnemy = enemySet.has(hero.name);
          const picked = isAlly || isEnemy;
          const counters = enemies.filter((e) => counterWeight(e, hero.name) > 0).length;

          return (
            <div
              key={hero.name}
              style={{ animationDelay: `${Math.min(i, 24) * 12}ms` }}
              className={cn(
                'group/hero relative animate-slide-up overflow-hidden rounded-md border transition-all duration-200',
                picked
                  ? isAlly
                    ? 'border-radiant-500/70 opacity-95'
                    : 'border-dire-500/70 opacity-95'
                  : inspected === hero.name
                    ? 'border-gold-400/70'
                    : 'border-void-750 hover:-translate-y-0.5 hover:border-ember-500/60'
              )}
            >
              <button
                type="button"
                onClick={() =>
                  picked ? onRemove(isAlly ? 'ally' : 'enemy', hero.name) : onPick(hero.name)
                }
                onDoubleClick={() => onInspect(hero.name)}
                title={
                  picked
                    ? `Убрать ${hero.name} из драфта`
                    : `Добавить ${hero.name} ${activeSide === 'ally' ? 'в вашу команду' : 'в команду врага'}`
                }
                className="block w-full text-left"
              >
                <HeroImage
                  name={hero.name}
                  className={cn(
                    'aspect-[16/10] w-full transition-all duration-300 group-hover/hero:scale-110',
                    picked && 'saturate-[0.35]'
                  )}
                />
                <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-void-950 via-void-950/90 to-transparent px-1 pt-4 pb-0.5 text-[10px] leading-tight font-semibold text-mist-50">
                  {hero.name}
                </span>
              </button>

              {counters > 0 && !picked && (
                <span
                  className="absolute top-0.5 left-0.5 rounded-sm bg-radiant-500/90 px-1 font-mono text-[9px] font-bold text-void-950"
                  title={`Контрит ${counters} ${counters === 1 ? 'пик' : 'пика'} врага`}
                >
                  +{counters}
                </span>
              )}

              <button
                type="button"
                onClick={() => onInspect(hero.name)}
                title={`Разбор матчапов: ${hero.name}`}
                className="absolute top-0.5 right-0.5 rounded-sm bg-void-950/85 px-1 font-mono text-[9px] font-bold text-gold-400 opacity-0 transition-opacity duration-200 group-hover/hero:opacity-100"
              >
                ИНФО
              </button>
            </div>
          );
        })}

        {visible.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-mist-600">
            Ни один герой не подходит под «{search}».
          </p>
        )}
      </div>
    </section>
  );
}

