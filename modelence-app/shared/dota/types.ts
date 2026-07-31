/**
 * Shared Dota 2 draft-domain types. Used by both the counter data files and
 * the drafting engine. Pure TypeScript — safe to import from client or server.
 */

export type Role = 'carry' | 'mid' | 'offlane' | 'support' | 'roamer';

/**
 * Archetype tags. These drive item recommendations: an item declares which
 * archetypes it punishes, a hero declares which archetypes it belongs to.
 */
export type Tag =
  | 'magic'
  | 'physical'
  | 'tank'
  | 'mobile'
  | 'illusion'
  | 'summon'
  | 'invis'
  | 'regen'
  | 'disable'
  | 'burst'
  | 'pusher'
  | 'silence';

export interface Hero {
  /** Display name, e.g. "Anti-Mage". Also the primary key across all data. */
  name: string;
  /** Valve internal name used for CDN portraits, e.g. "antimage". */
  slug: string;
  roles: Role[];
  tags: Tag[];
  /** Public win rate (all ranks), used for tie-breaking and display. */
  winRate: number;
}

export type ItemCategory = 'defense' | 'offense' | 'utility' | 'vision';

export interface Item {
  name: string;
  /** Valve internal name used for CDN icons, e.g. "black_king_bar". */
  slug: string;
  description: string;
  category: ItemCategory;
  /** Enemy archetypes this item is effective against. */
  counters: Tag[];
}

/** Display labels are Russian — the keys stay English and are the real data. */
export const ROLE_LABELS: Record<Role, string> = {
  carry: 'Керри',
  mid: 'Мид',
  offlane: 'Оффлейн',
  support: 'Саппорт',
  roamer: 'Роумер',
};

export const TAG_LABELS: Record<Tag, string> = {
  magic: 'Магический урон',
  physical: 'Физический урон',
  tank: 'Живучий',
  mobile: 'Мобильный',
  illusion: 'Иллюзии',
  summon: 'Призывы',
  invis: 'Невидимость',
  regen: 'Восстановление',
  disable: 'Контроль',
  burst: 'Бурст',
  pusher: 'Пушер',
  silence: 'Молчание',
};

/** One-line explanation of each archetype, used in the help guide. */
export const TAG_HINTS: Record<Tag, string> = {
  magic: 'Наносит урон заклинаниями — против него берут сопротивление магии.',
  physical: 'Убивает автоатаками — против него берут броню и уклонение.',
  tank: 'Много здоровья и брони — нужен минус к броне или чистый урон.',
  mobile: 'Легко убегает и прыгает — нужен надёжный контроль.',
  illusion: 'Создаёт копии — нужен урон по площади и рассекающие удары.',
  summon: 'Призывает существ — тоже решается уроном по площади.',
  invis: 'Уходит в невидимость — нужны варды, пыль или камень.',
  regen: 'Быстро восстанавливается — нужно снижение лечения.',
  disable: 'Много станов и контроля — спасает BKB и сопротивление эффектам.',
  burst: 'Убивает одним комбо — нужен запас здоровья и спасающие предметы.',
  pusher: 'Ломает вышки и линии — нужен обзор и быстрый ответ на карте.',
  silence: 'Затыкает заклинания — нужны предметы, снимающие дебаффы.',
};

export const CATEGORY_LABELS: Record<ItemCategory, string> = {
  defense: 'Защита',
  offense: 'Атака',
  utility: 'Утилита',
  vision: 'Обзор',
};

