import { useMemo } from 'react';
import { Scale } from 'lucide-react';
import { draftAdvantage } from '@/shared/dota/engine';
import { cn } from '@/client/lib/utils';
import { HeroImage } from './HeroImage';

function verdict(balance: number, hasData: boolean) {
  if (!hasData) return { label: 'Пока ровно', tone: 'text-mist-400' };
  if (balance >= 0.45) return { label: 'Вы доминируете', tone: 'text-radiant-400' };
  if (balance >= 0.15) return { label: 'Перевес у вас', tone: 'text-radiant-400' };
  if (balance > -0.15) return { label: 'Равный матчап', tone: 'text-gold-400' };
  if (balance > -0.45) return { label: 'Перевес у врага', tone: 'text-dire-400' };
  return { label: 'Враг доминирует', tone: 'text-dire-400' };
}

function MatchupRow({
  entry,
  tone,
}: {
  entry: { hero: string; over: string; weight: number };
  tone: 'radiant' | 'dire';
}) {
  return (
    <li className="flex items-center gap-1.5 text-[11px]">
      <HeroImage
        name={entry.hero}
        className={cn(
          'h-4 w-6 shrink-0 rounded-[2px] ring-1',
          tone === 'radiant' ? 'ring-radiant-500/50' : 'ring-dire-500/50'
        )}
      />
      <span className="truncate text-mist-200">{entry.hero}</span>
      <span className="shrink-0 text-mist-600">›</span>
      <HeroImage
        name={entry.over}
        className="h-4 w-6 shrink-0 rounded-[2px] ring-1 ring-void-700 saturate-[0.45]"
      />
      <span className="truncate text-mist-400">{entry.over}</span>
    </li>
  );
}

export default function AdvantageMeter({
  allies,
  enemies,
}: {
  allies: string[];
  enemies: string[];
}) {
  const report = useMemo(() => draftAdvantage(allies, enemies), [allies, enemies]);
  const hasData = report.allyScore + report.enemyScore > 0;
  const v = verdict(report.balance, hasData);

  // Map balance (-1…1) onto a 0…100% marker position.
  const markerPct = 50 + report.balance * 50;
  const allyPct = hasData
    ? (report.allyScore / (report.allyScore + report.enemyScore)) * 100
    : 50;

  return (
    <section className="panel animate-fade-in overflow-hidden">
      <div className="flex items-center gap-2 border-b border-void-750 px-3 py-2">
        <Scale className="size-3.5 shrink-0 text-gold-400" aria-hidden="true" />
        <h2 className="font-display text-[13px] font-semibold tracking-[0.12em] uppercase text-mist-50">
          Баланс сил
        </h2>
        <span className={cn('ml-auto text-[11px] font-bold tracking-[0.08em] uppercase', v.tone)}>
          {v.label}
        </span>
      </div>

      <div className="p-3">
        <div className="mb-1 flex items-baseline justify-between font-mono text-[11px] tabular-nums">
          <span className="text-dire-400">{report.enemyScore.toFixed(1)}</span>
          <span className="label-caps">Давление контрпиков</span>
          <span className="text-radiant-400">{report.allyScore.toFixed(1)}</span>
        </div>

        <div className="relative h-2.5 overflow-hidden rounded-full border border-void-700 bg-void-900">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-dire-600 to-dire-500/70 transition-all duration-700 ease-out"
            style={{ width: `${100 - allyPct}%` }}
          />
          <div
            className="absolute inset-y-0 right-0 bg-gradient-to-l from-radiant-500 to-radiant-500/70 transition-all duration-700 ease-out"
            style={{ width: `${allyPct}%` }}
          />
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-void-950/70" />
        </div>

        <div className="relative mt-1 h-3">
          <div
            className="absolute top-0 -translate-x-1/2 transition-all duration-700 ease-out"
            style={{ left: `${markerPct}%` }}
          >
            <div className="size-0 border-x-[5px] border-b-[6px] border-x-transparent border-b-gold-400" />
          </div>
        </div>

        {hasData ? (
          <div className="mt-1 grid gap-3 sm:grid-cols-2">
            {report.edges.length > 0 && (
              <div>
                <h3 className="label-caps mb-1 text-radiant-400">Ваши преимущества</h3>
                <ul className="space-y-1">
                  {report.edges.map((e) => (
                    <MatchupRow key={`${e.hero}-${e.over}`} entry={e} tone="radiant" />
                  ))}
                </ul>
              </div>
            )}
            {report.liabilities.length > 0 && (
              <div>
                <h3 className="label-caps mb-1 text-dire-400">Преимущества врага</h3>
                <ul className="space-y-1">
                  {report.liabilities.map((e) => (
                    <MatchupRow key={`${e.hero}-${e.over}`} entry={e} tone="dire" />
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-2 text-[11px] text-mist-600">
Выберите героев с обеих сторон, чтобы взвесить драфт.
          </p>
        )}
      </div>
    </section>
  );
}

