import { X } from 'lucide-react';
import { heroByName, heroPortrait } from '@/shared/dota/heroes';
import { heroMatchups } from '@/shared/dota/engine';
import { ROLE_LABELS } from '@/shared/dota/types';
import { cn } from '@/client/lib/utils';
import { HeroImage, ItemImage, TagPill } from './HeroImage';
import type { Side } from './DraftBoard';

function HeroRow({
  names,
  onInspect,
  tone,
  emptyLabel,
}: {
  names: string[];
  onInspect: (name: string) => void;
  tone: string;
  emptyLabel: string;
}) {
  if (names.length === 0) {
    return <p className="text-[11px] text-mist-600">{emptyLabel}</p>;
  }
  return (
    <div className="flex flex-wrap gap-1">
      {names.map((name, i) => (
        <button
          key={name}
          type="button"
          onClick={() => onInspect(name)}
          style={{ animationDelay: `${Math.min(i, 16) * 20}ms` }}
          className={cn(
            'animate-pop-in flex items-center gap-1.5 rounded-sm border py-0.5 pr-1.5 pl-0.5 text-[11px] font-medium transition-all duration-200 hover:-translate-y-0.5',
            tone
          )}
          title={`Подробнее: ${name}`}
        >
          <HeroImage name={name} className="h-5 w-8 rounded-[2px]" />
          <span className="max-w-[120px] truncate">{name}</span>
        </button>
      ))}
    </div>
  );
}

export default function HeroDetail({
  name,
  onClose,
  onInspect,
  onAdd,
}: {
  name: string;
  onClose: () => void;
  onInspect: (name: string) => void;
  onAdd: (side: Side, name: string) => void;
}) {
  const hero = heroByName[name];
  if (!hero) return null;
  const m = heroMatchups(name);

  return (
    <section className="panel animate-slide-down overflow-hidden">
      <div className="relative">
        <img
          src={heroPortrait(hero, 'lg')}
          alt={hero.name}
          className="h-28 w-full object-cover object-[center_28%] sm:h-32"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void-900 via-void-900/40 to-transparent" />
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 rounded-sm bg-void-950/70 p-1 text-mist-200 transition-colors duration-200 hover:bg-dire-600 hover:text-white"
          title="Закрыть"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end gap-2 p-3">
          <div className="min-w-0">
            <h2 className="truncate font-display text-lg leading-tight font-bold text-mist-50">
              {hero.name}
            </h2>
            <p className="text-[11px] text-mist-400">
              {hero.roles.map((r) => ROLE_LABELS[r]).join(' · ')} ·{' '}
              <span className="font-mono text-gold-400">{hero.winRate}%</span> побед
            </p>
          </div>
          <div className="ml-auto flex gap-1">
            <button
              type="button"
              onClick={() => onAdd('enemy', hero.name)}
              className="rounded-sm border border-dire-500/50 bg-void-950/70 px-2 py-1 text-[10px] font-bold tracking-[0.08em] uppercase text-dire-400 transition-colors duration-200 hover:bg-dire-600 hover:text-white"
            >
              + Врагу
            </button>
            <button
              type="button"
              onClick={() => onAdd('ally', hero.name)}
              className="rounded-sm border border-radiant-500/50 bg-void-950/70 px-2 py-1 text-[10px] font-bold tracking-[0.08em] uppercase text-radiant-400 transition-colors duration-200 hover:bg-radiant-500 hover:text-void-950"
            >
              + Себе
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-3">
        <div className="flex flex-wrap gap-1">
          {hero.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>

        <div>
          <h3 className="label-caps mb-1.5 text-dire-400">Его контрят</h3>
          <HeroRow
            names={m.counteredBy}
            onInspect={onInspect}
            tone="border-dire-500/30 bg-dire-500/5 text-mist-200 hover:border-dire-500/70"
            emptyLabel="Жёстких контрпиков не найдено."
          />
        </div>

        <div>
          <h3 className="label-caps mb-1.5 text-radiant-400">Сам контрит</h3>
          <HeroRow
            names={m.counters}
            onInspect={onInspect}
            tone="border-radiant-500/30 bg-radiant-500/5 text-mist-200 hover:border-radiant-500/70"
            emptyLabel="Нет героев, которых он контрит."
          />
        </div>

        <div>
          <h3 className="label-caps mb-1.5 text-arcane-400">Выигрывает линию против</h3>
          <HeroRow
            names={m.laneWins}
            onInspect={onInspect}
            tone="border-arcane-500/30 bg-arcane-500/5 text-mist-200 hover:border-arcane-500/70"
            emptyLabel="Данных по линии нет."
          />
        </div>

        <div>
          <h3 className="label-caps mb-1.5 text-violet-500">Хорошо сочетается с</h3>
          <HeroRow
            names={m.synergy}
            onInspect={onInspect}
            tone="border-violet-500/30 bg-violet-500/5 text-mist-200 hover:border-violet-500/70"
            emptyLabel="Специальных комбинаций не отмечено."
          />
        </div>


        <div>
          <h3 className="label-caps mb-1.5 text-gold-400">Предметы против него</h3>
          {m.items.length === 0 ? (
            <p className="text-[11px] text-mist-600">Особых предметов против него нет.</p>
          ) : (
            <div className="flex flex-wrap gap-1">
              {m.items.map((item, i) => (
                <span
                  key={item}
                  style={{ animationDelay: `${Math.min(i, 16) * 20}ms` }}
                  className="animate-pop-in flex items-center gap-1.5 rounded-sm border border-gold-400/25 bg-gold-400/5 py-0.5 pr-1.5 pl-0.5 text-[11px] text-mist-200"
                  title={item}
                >
                  <ItemImage name={item} className="h-5 w-7 rounded-[2px]" />
                  <span className="max-w-[150px] truncate">{item}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

