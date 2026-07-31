import { Plus, ShieldHalf, Skull, Trash2, X } from 'lucide-react';
import { cn } from '@/client/lib/utils';
import { HeroImage } from './HeroImage';

export type Side = 'ally' | 'enemy';

const TEAM_SIZE = 5;

interface TeamPanelProps {
  side: Side;
  picks: string[];
  active: boolean;
  onActivate: () => void;
  onRemove: (name: string) => void;
  onInspect: (name: string) => void;
  onClear: () => void;
}

const CONFIG = {
  ally: {
    label: 'Ваша команда',
    hint: 'Свет',
    Icon: ShieldHalf,
    ring: 'ring-radiant-500/60',
    border: 'border-radiant-500/25',
    activeBorder: 'border-radiant-500/70',
    text: 'text-radiant-400',
    glow: 'shadow-[0_0_28px_-10px_rgba(47,211,154,0.55)]',
    slot: 'border-radiant-500/20 hover:border-radiant-500/50 hover:bg-radiant-500/5',
  },
  enemy: {
    label: 'Команда врага',
    hint: 'Тьма',
    Icon: Skull,
    ring: 'ring-dire-500/60',
    border: 'border-dire-500/25',
    activeBorder: 'border-dire-500/70',
    text: 'text-dire-400',
    glow: 'shadow-[0_0_28px_-10px_rgba(242,65,95,0.55)]',
    slot: 'border-dire-500/20 hover:border-dire-500/50 hover:bg-dire-500/5',
  },
} as const;

function TeamPanel({
  side,
  picks,
  active,
  onActivate,
  onRemove,
  onInspect,
  onClear,
}: TeamPanelProps) {
  const c = CONFIG[side];
  const empty = Math.max(0, TEAM_SIZE - picks.length);

  return (
    <section
      onClick={onActivate}
      className={cn(
        'panel cursor-pointer p-3 transition-all duration-200 sm:p-4',
        c.border,
        active && [c.activeBorder, c.glow]
      )}
    >
      <header className="mb-3 flex items-center gap-2">
        <c.Icon className={cn('size-4 shrink-0', c.text)} aria-hidden="true" />
        <h2 className="font-display text-[13px] font-semibold tracking-[0.12em] uppercase text-mist-50">
          {c.label}
        </h2>
        <span className="label-caps hidden sm:inline">{c.hint}</span>
        <span className={cn('ml-auto font-mono text-xs tabular-nums', c.text)}>
          {picks.length}/{TEAM_SIZE}
        </span>
        {picks.length > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            title={`Очистить: ${c.label.toLowerCase()}`}
            className="rounded-sm p-1 text-mist-600 transition-colors duration-200 hover:bg-void-800 hover:text-dire-400"
          >
            <Trash2 className="size-3.5" aria-hidden="true" />
          </button>
        )}
      </header>

      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {picks.map((name, i) => (
            <div
              key={name}
              style={{ animationDelay: `${i * 45}ms` }}
              className={cn(
                'group/slot relative animate-pop-in overflow-hidden rounded-md ring-1',
                c.ring
              )}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onInspect(name);
                }}
                className="block w-full"
                title={`Подробнее: ${name}`}
              >
                <HeroImage
                  name={name}
                  className="aspect-[16/10] w-full transition-transform duration-300 group-hover/slot:scale-110"
                />
                <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-void-950 via-void-950/85 to-transparent px-1 pt-3 pb-0.5 text-[9px] leading-tight font-semibold text-mist-50 sm:text-[10px]">
                  {name}
                </span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(name);
                }}
                title={`Убрать: ${name}`}
                className="absolute top-0.5 right-0.5 rounded-sm bg-void-950/80 p-0.5 text-mist-200 opacity-0 transition-all duration-200 group-hover/slot:opacity-100 hover:bg-dire-600 hover:text-white"
              >
                <X className="size-3" aria-hidden="true" />
              </button>
          </div>
        ))}

        {Array.from({ length: empty }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className={cn(
              'flex aspect-[16/10] items-center justify-center rounded-md border border-dashed bg-void-900/50 transition-colors duration-200',
              c.slot,
              active && i === 0 && 'animate-glow border-solid'
            )}
          >
            <Plus className="size-3.5 text-mist-600" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function DraftBoard({
  allies,
  enemies,
  activeSide,
  onActiveSideChange,
  onRemove,
  onInspect,
  onClearSide,
}: {
  allies: string[];
  enemies: string[];
  activeSide: Side;
  onActiveSideChange: (side: Side) => void;
  onRemove: (side: Side, name: string) => void;
  onInspect: (name: string) => void;
  onClearSide: (side: Side) => void;
}) {
  return (
    <div className="relative grid gap-3 lg:grid-cols-2">
      {/* Centre sigil — only meaningful once the two panels sit side by side. */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
        <span className="flex size-9 items-center justify-center rounded-full border border-gold-400/45 bg-void-950 font-display text-[10px] font-bold tracking-[0.14em] text-gold-400 shadow-[0_0_20px_-4px_rgba(242,193,78,0.65)]">
          VS
        </span>
      </div>
      <TeamPanel
        side="enemy"
        picks={enemies}
        active={activeSide === 'enemy'}
        onActivate={() => onActiveSideChange('enemy')}
        onRemove={(name) => onRemove('enemy', name)}
        onInspect={onInspect}
        onClear={() => onClearSide('enemy')}
      />
      <TeamPanel
        side="ally"
        picks={allies}
        active={activeSide === 'ally'}
        onActivate={() => onActiveSideChange('ally')}
        onRemove={(name) => onRemove('ally', name)}
        onInspect={onInspect}
        onClear={() => onClearSide('ally')}
      />
    </div>
  );
}

