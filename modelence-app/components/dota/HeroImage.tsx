import { useState } from 'react';
import { heroByName, heroPortrait } from '@/shared/dota/heroes';
import { itemByName, itemIcon } from '@/shared/dota/items';
import { TAG_HINTS, TAG_LABELS, type Tag } from '@/shared/dota/types';
import { cn } from '@/client/lib/utils';

function initials(name: string) {
  return name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

/**
 * Hero name — the canonical way to render a hero label anywhere in the app.
 */
export function HeroName({ name, className }: { name: string; className?: string }) {
  return <span className={cn('block min-w-0 truncate', className)}>{name}</span>;
}

/** Hero portrait from the Dota 2 CDN, degrading to initials if the image fails. */
export function HeroImage({
  name,
  size = 'sm',
  className,
  title,
}: {
  name: string;
  size?: 'sm' | 'lg';
  className?: string;
  /** Hover tooltip — handy where the portrait carries no visible label. */
  title?: string;
}) {
  const [failed, setFailed] = useState(false);
  const hero = heroByName[name];

  if (!hero || failed) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-void-800 font-display text-[11px] font-semibold text-mist-400',
          className
        )}
        aria-label={name}
        title={title}
      >
        {initials(name)}
      </div>
    );
  }

  return (
    <img
      src={heroPortrait(hero, size)}
      alt={name}
      title={title}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      className={cn('object-cover', className)}
    />
  );
}

/** Item icon from the Dota 2 CDN, degrading to a gold placeholder. */
export function ItemImage({ name, className }: { name: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const item = itemByName[name];

  if (!item || failed) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-void-800 font-display text-[10px] text-gold-400',
          className
        )}
        aria-label={name}
      >
        {initials(name)}
      </div>
    );
  }

  return (
    <img
      src={itemIcon(item)}
      alt={name}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      className={cn('object-cover', className)}
    />
  );
}

const TAG_TONE: Record<Tag, string> = {
  magic: 'border-arcane-500/40 bg-arcane-500/10 text-arcane-400',
  physical: 'border-ember-600/40 bg-ember-600/10 text-ember-400',
  tank: 'border-void-600 bg-void-800 text-mist-200',
  mobile: 'border-radiant-500/30 bg-radiant-500/10 text-radiant-400',
  illusion: 'border-arcane-500/30 bg-arcane-500/10 text-arcane-400',
  summon: 'border-void-600 bg-void-800 text-mist-200',
  invis: 'border-void-600 bg-void-800 text-mist-400',
  regen: 'border-radiant-500/30 bg-radiant-500/10 text-radiant-400',
  disable: 'border-gold-400/30 bg-gold-400/10 text-gold-400',
  burst: 'border-dire-500/30 bg-dire-500/10 text-dire-400',
  pusher: 'border-void-600 bg-void-800 text-mist-200',
  silence: 'border-arcane-500/30 bg-arcane-500/10 text-arcane-400',
};

export function TagPill({ tag, className }: { tag: Tag; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]',
        TAG_TONE[tag],
        className
      )}
      title={TAG_HINTS[tag]}
    >
      {TAG_LABELS[tag]}
    </span>
  );
}

