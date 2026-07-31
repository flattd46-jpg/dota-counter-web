import { useMemo, useState } from 'react';
import { AlertTriangle, Crosshair, Plus, Swords, Target } from 'lucide-react';
import {
  analyzeThreats,
  lineupProfile,
  suggestHeroes,
  suggestItems,
} from '@/shared/dota/engine';
import { itemDescriptionRu } from '@/shared/dota/ru';
import { ROLE_LABELS, TAG_LABELS, type Role, type Tag } from '@/shared/dota/types';
import { cn } from '@/client/lib/utils';
import { HeroImage, HeroName, ItemImage, TagPill } from './HeroImage';

type Panel = 'counters' | 'items' | 'threats';

const PANELS: { id: Panel; label: string; Icon: typeof Swords }[] = [
  { id: 'counters', label: 'Контрпики', Icon: Swords },
  { id: 'items', label: 'Предметы', Icon: Crosshair },
  { id: 'threats', label: 'Угрозы', Icon: AlertTriangle },
];

const ROLES: Role[] = ['carry', 'mid', 'offlane', 'support', 'roamer'];

function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fade-in flex flex-col items-center gap-2 py-10 text-center">
      <Target className="size-6 text-void-600" aria-hidden="true" />
      <p className="max-w-[26ch] text-sm text-mist-600">{children}</p>
    </div>
  );
}

function ScoreBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.max(6, Math.round((value / max) * 100)) : 0;
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-void-800">
      <div
        className="h-full rounded-full bg-gradient-to-r from-ember-600 to-gold-400 transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function Advisor({
  allies,
  enemies,
  onPickAlly,
  onInspect,
}: {
  allies: string[];
  enemies: string[];
  onPickAlly: (name: string) => void;
  onInspect: (name: string) => void;
}) {
  const [panel, setPanel] = useState<Panel>('counters');
  const [role, setRole] = useState<Role | null>(null);

  const suggestions = useMemo(
    () => suggestHeroes(enemies, allies, { role, limit: 10 }),
    [enemies, allies, role]
  );
  const itemPicks = useMemo(() => suggestItems(enemies, 12), [enemies]);
  const threats = useMemo(() => analyzeThreats(allies, enemies), [allies, enemies]);
  const profile = useMemo(() => lineupProfile(enemies), [enemies]);

  const maxScore = suggestions[0]?.score ?? 0;
  const maxItem = itemPicks[0]?.score ?? 0;

  return (
    <section className="panel flex flex-col overflow-hidden">
      <div className="flex border-b border-void-750">
        {PANELS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setPanel(id)}
            className={cn(
              'relative flex flex-1 items-center justify-center gap-1.5 px-2 py-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors duration-200',
              panel === id
                ? 'text-ember-400'
                : 'text-mist-600 hover:bg-void-850 hover:text-mist-200'
            )}
          >
            <Icon className="size-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{label}</span>
            {panel === id && (
              <span className="absolute inset-x-2 bottom-0 h-px bg-gradient-to-r from-transparent via-ember-500 to-transparent" />
            )}
          </button>
        ))}
      </div>

      {enemies.length > 0 && Object.keys(profile).length > 0 && (
        <div className="flex flex-wrap gap-1 border-b border-void-750 bg-void-900/40 px-3 py-2">
          <span className="label-caps mr-1 self-center">Профиль врага</span>
          {(Object.entries(profile) as [Tag, number][])
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([tag, count]) => (
              <span
                key={tag}
                className="animate-pop-in inline-flex items-center gap-1 rounded-sm border border-void-700 bg-void-850 px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.06em] uppercase text-mist-200"
              >
                {TAG_LABELS[tag]}
                <span className="font-mono text-gold-400">×{count}</span>
              </span>
            ))}
        </div>
      )}

      <div className="max-h-[620px] overflow-y-auto p-3">
        {panel === 'counters' && (
          <>
            <div className="mb-3 flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setRole(null)}
                className={cn(
                  'rounded-sm border px-2 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase transition-colors duration-200',
                  role === null
                    ? 'border-ember-500 bg-ember-500/15 text-ember-400'
                    : 'border-void-700 text-mist-400 hover:text-mist-200'
                )}
              >
                Любая роль
              </button>
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={cn(
                    'rounded-sm border px-2 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase transition-colors duration-200',
                    role === r
                      ? 'border-ember-500 bg-ember-500/15 text-ember-400'
                      : 'border-void-700 text-mist-400 hover:text-mist-200'
                  )}
                >
                  {ROLE_LABELS[r]}
                </button>
              ))}
            </div>

            {enemies.length === 0 && allies.length === 0 ? (
              <EmptyHint>
                Добавьте героев в команду врага — и здесь появятся лучшие контрпики. Или соберите свою команду, чтобы увидеть синергию.
              </EmptyHint>
            ) : suggestions.length === 0 ? (
              <EmptyHint>
                Для этого фильтра сильных контрпиков нет. Попробуйте другую роль.
              </EmptyHint>
            ) : (
              <ol className="space-y-1.5">
                {suggestions.map((s, i) => (
                  <li
                    key={s.hero.name}
                    style={{ animationDelay: `${i * 35}ms` }}
                    className="group/sug animate-slide-up flex gap-2.5 rounded-md border border-void-750 bg-void-900/60 p-2 transition-all duration-200 hover:border-ember-500/50 hover:bg-void-850"
                  >
                    <span className="mt-1 w-4 shrink-0 text-center font-mono text-[11px] text-mist-600">
                      {i + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => onInspect(s.hero.name)}
                      className="h-11 w-[70px] shrink-0 overflow-hidden rounded-sm ring-1 ring-void-700 transition-transform duration-200 group-hover/sug:ring-ember-500/50"
                      title={`Разбор матчапов: ${s.hero.name}`}
                    >
                      <HeroImage name={s.hero.name} className="h-full w-full" />
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <HeroName
                          name={s.hero.name}
                          className="min-w-0 flex-1 font-sans text-sm font-semibold text-mist-50"
                        />
                        <span className="ml-auto shrink-0 font-mono text-xs font-bold text-gold-400 tabular-nums">
                          {s.score.toFixed(1)}
                        </span>
                      </div>
                      <div className="mt-1 mb-1.5">
                        <ScoreBar value={s.score} max={maxScore} />
                      </div>
                      <p className="text-[11px] leading-snug text-mist-400">
                        {s.beats.length > 0 && (
                          <>
                            <span className="font-semibold text-radiant-400">Бьёт</span>{' '}
                            {s.beats.join(', ')}
                          </>
                        )}
                        {s.lanes.length > 0 && (
                          <>
                            {s.beats.length > 0 && ' · '}
                            <span className="font-semibold text-arcane-400">Линия</span>{' '}
                            {s.lanes.join(', ')}
                          </>
                        )}
                        {s.synergy.length > 0 && (
                          <>
                            {(s.beats.length > 0 || s.lanes.length > 0) && ' · '}
                            <span className="font-semibold text-violet-500">Синергия</span>{' '}
                            {s.synergy.join(', ')}
                          </>
                        )}
                        {s.risk.length > 0 && (
                          <>
                            {(s.beats.length > 0 || s.lanes.length > 0 || s.synergy.length > 0) && ' · '}
                            <span className="font-semibold text-dire-400">Риск</span>{' '}
                            {s.risk.join(', ')}
                          </>
                        )}
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-1">
                        <span className="label-caps">{s.hero.winRate}% побед</span>
                        {s.hero.roles.slice(0, 2).map((r) => (
                          <span
                            key={r}
                            className="rounded-sm border border-void-700 px-1 text-[10px] text-mist-400"
                          >
                            {ROLE_LABELS[r]}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onPickAlly(s.hero.name)}
                      title={`Добавить ${s.hero.name} в вашу команду`}
                      className="my-auto shrink-0 rounded-sm border border-radiant-500/40 bg-radiant-500/10 p-1.5 text-radiant-400 transition-all duration-200 hover:bg-radiant-500 hover:text-void-950"
                    >
                      <Plus className="size-3.5" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </>
        )}

        {panel === 'items' && (
          <>
            {enemies.length === 0 ? (
              <EmptyHint>
Соберите состав врага — и увидите, какие предметы наказывают его сильнее всего.
              </EmptyHint>
            ) : (
              <ul className="space-y-1.5">
                {itemPicks.map((s, i) => (
                  <li
                    key={s.item.name}
                    style={{ animationDelay: `${i * 30}ms` }}
                    className="animate-slide-up flex gap-2.5 rounded-md border border-void-750 bg-void-900/60 p-2 transition-colors duration-200 hover:border-gold-400/50"
                  >
                    <ItemImage
                      name={s.item.name}
                      className="mt-0.5 h-[34px] w-[46px] shrink-0 rounded-sm ring-1 ring-gold-400/25"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <h3 className="min-w-0 flex-1 truncate font-sans text-sm font-semibold text-mist-50">
                          {s.item.name}
                        </h3>
                        <span className="ml-auto shrink-0 font-mono text-[11px] text-gold-400 tabular-nums">
                          {s.score.toFixed(1)}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] leading-snug text-mist-400">
                        {itemDescriptionRu(s.item.name, s.item.description)}
                      </p>
                      {s.against.length > 0 && (
                        <p className="mt-1 text-[11px] text-dire-400">
                          против: {s.against.join(', ')}
                        </p>
                      )}
                    </div>
                    <ScoreBarSpacer max={maxItem} value={s.score} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {panel === 'threats' && (
          <>
            {allies.length === 0 ? (
              <EmptyHint>
Добавьте свои пики — и увидите, какие герои врага их наказывают.
              </EmptyHint>
            ) : (
              <ul className="space-y-1.5">
                {threats.map((t, i) => (
                  <li
                    key={t.hero.name}
                    style={{ animationDelay: `${i * 35}ms` }}
                    className="animate-slide-up flex gap-2.5 rounded-md border border-void-750 bg-void-900/60 p-2"
                  >
                    <HeroImage
                      name={t.hero.name}
                      className="h-11 w-[70px] shrink-0 rounded-sm ring-1 ring-void-700"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <HeroName
                          name={t.hero.name}
                          className="min-w-0 flex-1 font-sans text-sm font-semibold text-mist-50"
                        />
                        <span
                          className={cn(
                            'ml-auto shrink-0 rounded-sm px-1.5 py-0.5 text-[10px] font-bold tracking-[0.08em] uppercase',
                            t.pressure === 0
                              ? 'bg-radiant-500/15 text-radiant-400'
                              : t.pressure >= 4
                                ? 'bg-dire-500/20 text-dire-400'
                                : 'bg-gold-400/15 text-gold-400'
                          )}
                        >
                          {t.pressure === 0
                            ? 'В порядке'
                            : t.pressure >= 4
                              ? 'Высокий риск'
                              : 'Осторожно'}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] leading-snug text-mist-400">
                        {t.threats.length > 0
                          ? `Его контрят: ${t.threats.join(', ')}`
                          : 'Ни один пик врага не контрит этого героя.'}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {t.hero.tags.slice(0, 3).map((tag) => (
                          <TagPill key={tag} tag={tag} />
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/** Thin vertical strength indicator for item rows. */
function ScoreBarSpacer({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.max(8, Math.round((value / max) * 100)) : 0;
  return (
    <div className="relative w-1 shrink-0 overflow-hidden rounded-full bg-void-800">
      <div
        className="absolute bottom-0 w-full rounded-full bg-gradient-to-t from-ember-600 to-gold-400 transition-all duration-500"
        style={{ height: `${pct}%` }}
      />
    </div>
  );
}

