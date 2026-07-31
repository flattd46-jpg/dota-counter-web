import { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  Crosshair,
  Info,
  Save,
  Scale,
  Skull,
  Swords,
} from 'lucide-react';
import { TAG_HINTS, TAG_LABELS, type Tag } from '@/shared/dota/types';
import { cn } from '@/client/lib/utils';

const STEPS: { Icon: typeof Skull; title: string; text: string }[] = [
  {
    Icon: Skull,
    title: '1. Отметьте врагов',
    text: 'По ходу пиков нажимайте на героев соперника — они попадают в «Команду врага». Повторный клик убирает героя.',
  },
  {
    Icon: Swords,
    title: '2. Смотрите контрпики',
    text: 'Во вкладке «Контрпики» список сразу пересчитывается. Зелёный плюс добавляет героя в вашу команду.',
  },
  {
    Icon: Crosshair,
    title: '3. Проверьте предметы и угрозы',
    text: '«Предметы» — что покупать против этого состава. «Угрозы» — кого из ваших героев враг наказывает.',
  },
  {
    Icon: Save,
    title: '4. Сохраните состав',
    text: 'Готовый драфт можно назвать и сохранить, чтобы вернуться к нему в следующей игре.',
  },
];

const SCORE_ROWS: { label: string; value: string; text: string; tone: string }[] = [
  {
    label: 'Главный контрпик',
    value: '+3,0',
    text: 'Герой стоит первым в списке контрпиков против врага — самый жёсткий ответ.',
    tone: 'text-radiant-400',
  },
  {
    label: 'Сильный контрпик',
    value: '+2,5',
    text: 'Второе или третье место в списке — по-прежнему очень неприятен врагу.',
    tone: 'text-radiant-400',
  },
  {
    label: 'Обычный контрпик',
    value: '+2,0',
    text: 'Просто известное преимущество в матчапе.',
    tone: 'text-radiant-400',
  },
  {
    label: 'Победа на линии',
    value: '+1,5',
    text: 'Отдельно доминирует на линии против кого-то из врагов.',
    tone: 'text-arcane-400',
  },
  {
    label: 'Обратный риск',
    value: '−0,8 за каждого',
    text: 'Штраф, если враг тоже контрит этого героя — обмен пиками работает в обе стороны.',
    tone: 'text-dire-400',
  },
  {
    label: 'Поправка на винрейт',
    value: '±0,12 за 1%',
    text: 'Небольшой сдвиг по общей статистике побед — разводит героев с равными оценками.',
    tone: 'text-gold-400',
  },
];

const LEGEND: { badge: string; badgeClass: string; text: string }[] = [
  {
    badge: '+2',
    badgeClass: 'bg-radiant-500/90 text-void-950',
    text: 'На портрете в списке героев: скольких врагов из текущего состава этот герой контрит.',
  },
  {
    badge: 'ИНФО',
    badgeClass: 'bg-void-950 text-gold-400 border border-void-700',
    text: 'Открывает полный разбор героя: кто его контрит, кого контрит он, линии и предметы.',
  },
  {
    badge: '7,4',
    badgeClass: 'bg-void-850 text-gold-400 border border-gold-400/30',
    text: 'Итоговая оценка контрпика. Оранжевая полоска под ней — то же значение относительно лидера списка.',
  },
];

function Panel({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Info;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-void-750 bg-void-900/50 p-3">
      <h3 className="mb-2 flex items-center gap-1.5 font-display text-[12px] font-semibold tracking-[0.12em] uppercase text-mist-50">
        <Icon className="size-3.5 shrink-0 text-ember-500" aria-hidden="true" />
        {title}
      </h3>
      {children}
    </div>
  );
}

// Expanded automatically on a visitor's first session, collapsed on every visit after that.
const SEEN_KEY = 'counterweb.guide-seen';

function initialOpen(defaultOpen: boolean) {
  if (defaultOpen) return true;
  try {
    return typeof window !== 'undefined' && !window.localStorage.getItem(SEEN_KEY);
  } catch {
    return false;
  }
}

export default function HelpGuide({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(() => initialOpen(defaultOpen));

  const toggle = () => {
    setOpen((v) => !v);
    try {
      window.localStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* private mode — the guide simply reopens next time */
    }
  };

  return (
    <section className="panel animate-fade-in overflow-hidden">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center gap-2 px-3 py-2.5 text-left transition-colors duration-200 hover:bg-void-850"
      >
        <BookOpen className="size-4 shrink-0 text-ember-500" aria-hidden="true" />
        <h2 className="font-display text-[13px] font-semibold tracking-[0.12em] uppercase text-mist-50">
          Как пользоваться
        </h2>
        <span className="hidden text-[11px] text-mist-600 sm:inline">
          Четыре шага и расшифровка всех оценок
        </span>
        <ChevronDown
          className={cn(
            'ml-auto size-4 shrink-0 text-mist-400 transition-transform duration-300',
            open && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="animate-slide-down space-y-3 border-t border-void-750 p-3">
          {/* Steps */}
          <ol className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {STEPS.map(({ Icon, title, text }, i) => (
              <li
                key={title}
                style={{ animationDelay: `${i * 45}ms` }}
                className="animate-slide-up rounded-md border border-void-750 bg-void-900/50 p-3 transition-colors duration-200 hover:border-ember-500/40"
              >
                <h3 className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-mist-50">
                  <Icon className="size-3.5 shrink-0 text-ember-500" aria-hidden="true" />
                  {title}
                </h3>
                <p className="text-[11px] leading-relaxed text-mist-400">{text}</p>
              </li>
            ))}
          </ol>

          <div className="grid gap-3 lg:grid-cols-2">
            {/* Scoring formula */}
            <Panel icon={Swords} title="Из чего складывается оценка">
              <ul className="space-y-1.5">
                {SCORE_ROWS.map((row) => (
                  <li key={row.label} className="flex gap-2 text-[11px] leading-snug">
                    <span
                      className={cn(
                        'w-[92px] shrink-0 text-right font-mono font-bold tabular-nums',
                        row.tone
                      )}
                    >
                      {row.value}
                    </span>
                    <span className="min-w-0">
                      <span className="font-semibold text-mist-200">{row.label}</span>
                      <span className="block text-mist-400">{row.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 border-t border-void-750 pt-2 text-[11px] leading-relaxed text-mist-600">
                Оценки суммируются по всем героям врага. Абсолютное число не важно — важен порядок:
                чем выше герой в списке, тем больше проблем он создаёт этому составу.
              </p>
            </Panel>

            <div className="space-y-3">
              {/* Badge legend */}
              <Panel icon={Info} title="Обозначения на экране">
                <ul className="space-y-2">
                  {LEGEND.map((row) => (
                    <li key={row.badge} className="flex items-start gap-2 text-[11px] leading-snug">
                      <span
                        className={cn(
                          'shrink-0 rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-bold',
                          row.badgeClass
                        )}
                      >
                        {row.badge}
                      </span>
                      <span className="text-mist-400">{row.text}</span>
                    </li>
                  ))}
                </ul>
              </Panel>

              {/* Balance meter */}
              <Panel icon={Scale} title="Баланс сил">
                <p className="text-[11px] leading-relaxed text-mist-400">
                  Полоса складывает давление контрпиков в обе стороны:{' '}
                  <span className="font-semibold text-radiant-400">зелёная часть</span> — насколько
                  ваш состав неприятен врагу,{' '}
                  <span className="font-semibold text-dire-400">красная</span> — наоборот. Золотой
                  указатель показывает итог. Он честен только при заполненных обеих сторонах: на
                  двух-трёх пиках перевес почти ничего не значит.
                </p>
              </Panel>
            </div>
          </div>

          {/* Archetypes */}
          <Panel icon={Crosshair} title="Архетипы врага и что с ними делать">
            <ul className="grid gap-x-4 gap-y-1.5 sm:grid-cols-2 xl:grid-cols-3">
              {(Object.keys(TAG_LABELS) as Tag[]).map((tag) => (
                <li key={tag} className="text-[11px] leading-snug">
                  <span className="font-semibold text-mist-200">{TAG_LABELS[tag]}</span>
                  <span className="block text-mist-400">{TAG_HINTS[tag]}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 border-t border-void-750 pt-2 text-[11px] leading-relaxed text-mist-600">
              Строка «Профиль врага» над вкладками считает эти архетипы в составе соперника —
              именно по ней подбираются предметы.
            </p>
          </Panel>
        </div>
      )}
    </section>
  );
}

