import { useCallback, useState } from 'react';
import { RotateCcw, ShieldHalf, Skull, Swords } from 'lucide-react';
import Page from '@/client/components/Page';
import Advisor from '@/client/components/dota/Advisor';
import AdvantageMeter from '@/client/components/dota/AdvantageMeter';
import DraftBoard, { type Side } from '@/client/components/dota/DraftBoard';
import DraftLibrary from '@/client/components/dota/DraftLibrary';
import HeroDetail from '@/client/components/dota/HeroDetail';
import HeroPool from '@/client/components/dota/HeroPool';
import HelpGuide from '@/client/components/dota/HelpGuide';
import { heroPortrait, heroes } from '@/shared/dota/heroes';
import { items } from '@/shared/dota/items';
import { totalCounterPairs } from '@/shared/dota/counters';
import { cn } from '@/client/lib/utils';

const TEAM_SIZE = 5;

export default function HomePage() {
  const [allies, setAllies] = useState<string[]>([]);
  const [enemies, setEnemies] = useState<string[]>([]);
  const [activeSide, setActiveSide] = useState<Side>('enemy');
  const [inspected, setInspected] = useState<string | null>(null);

  const addTo = useCallback(
    (side: Side, name: string) => {
      const current = side === 'ally' ? allies : enemies;
      const other = side === 'ally' ? enemies : allies;
      if (other.includes(name)) return;
      if (current.includes(name) || current.length >= TEAM_SIZE) return;
      const next = [...current, name];
      if (side === 'ally') setAllies(next);
      else setEnemies(next);
      if (next.length >= TEAM_SIZE) {
        setActiveSide(side === 'ally' ? 'enemy' : 'ally');
      }
    },
    [allies, enemies]
  );

  const pick = useCallback((name: string) => addTo(activeSide, name), [addTo, activeSide]);

  const remove = useCallback((side: Side, name: string) => {
    const setter = side === 'ally' ? setAllies : setEnemies;
    setter((prev) => prev.filter((n) => n !== name));
  }, []);

  const clearSide = useCallback((side: Side) => {
    (side === 'ally' ? setAllies : setEnemies)([]);
  }, []);

  const resetAll = useCallback(() => {
    setAllies([]);
    setEnemies([]);
    setInspected(null);
    setActiveSide('enemy');
  }, []);

  const loadDraft = useCallback(({ allies: a, enemies: e }: { allies: string[]; enemies: string[] }) => {
    setAllies(a);
    setEnemies(e);
    setInspected(null);
    setActiveSide(e.length >= TEAM_SIZE ? 'ally' : 'enemy');
  }, []);

  const picksMade = allies.length + enemies.length;

  // The most recent pick becomes the ambient backdrop behind the header.
  const spotlight = enemies[enemies.length - 1] ?? allies[allies.length - 1] ?? null;

  return (
    <Page className="p-0 sm:p-0" seo={{ title: 'Counter Web — помощник по драфту Dota 2' }}>
      <div className="mx-auto w-full max-w-[1500px] space-y-3 px-3 py-4 sm:px-5">
        <header className="animate-fade-in relative flex flex-wrap items-end gap-x-6 gap-y-3 overflow-hidden rounded-lg border border-void-750/70 px-3 py-3 sm:px-4">
          {spotlight && (
            <img
              key={spotlight}
              src={heroPortrait(spotlight, 'lg')}
              alt=""
              aria-hidden="true"
              className="animate-fade-in pointer-events-none absolute -top-1/4 right-0 h-[150%] w-2/3 object-cover opacity-[0.13] [mask-image:linear-gradient(to_left,black,transparent)]"
            />
          )}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void-950 via-void-950/70 to-transparent"
          />

          <div className="relative">
            <p className="label-caps flex items-center gap-1.5">
              <Swords className="size-3 text-ember-500" aria-hidden="true" />
              Помощник по драфту в реальном времени
            </p>
            <h1 className="mt-0.5 font-display text-2xl leading-none font-bold sm:text-3xl">
              The <span className="text-ember-500">Counter</span> Web
            </h1>
            <p className="mt-1.5 max-w-[64ch] text-sm text-mist-400">
              Отмечайте героев врага по ходу пиков — и сразу видите, кем и чем их наказать.
              Контрпики, матчапы на линии и предметы обновляются после каждого пика.
            </p>
          </div>

          <div className="relative ml-auto flex flex-wrap items-center gap-4">
            <dl className="flex gap-4">
              {[
                { label: 'Героев', value: heroes.length },
                { label: 'Связок', value: totalCounterPairs },
                { label: 'Предметов', value: items.length },
              ].map((stat) => (
                <div key={stat.label}>
                  <dd className="font-display text-lg leading-none font-bold text-gold-400 tabular-nums">
                    {stat.value}
                  </dd>
                  <dt className="label-caps mt-0.5">{stat.label}</dt>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={resetAll}
              disabled={picksMade === 0}
              className="flex items-center gap-1.5 rounded-md border border-void-700 px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase text-mist-400 transition-all duration-200 hover:border-ember-500/60 hover:text-ember-400 disabled:pointer-events-none disabled:opacity-35"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              Сбросить драфт
            </button>
          </div>
        </header>

        <HelpGuide />

        <DraftBoard
          allies={allies}
          enemies={enemies}
          activeSide={activeSide}
          onActiveSideChange={setActiveSide}
          onRemove={remove}
          onInspect={setInspected}
          onClearSide={clearSide}
        />

        <AdvantageMeter allies={allies} enemies={enemies} />

        <div className="animate-fade-in flex flex-wrap items-center gap-2 rounded-md border border-void-750 bg-void-900/50 px-3 py-2">
          <span className="label-caps">Клик по герою добавляет в</span>
          <div className="flex overflow-hidden rounded-md border border-void-700">
            {(
              [
                { side: 'enemy', label: 'Команду врага', Icon: Skull },
                { side: 'ally', label: 'Вашу команду', Icon: ShieldHalf },
              ] as const
            ).map(({ side, label, Icon }) => (
              <button
                key={side}
                type="button"
                onClick={() => setActiveSide(side)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase transition-colors duration-200',
                  activeSide === side
                    ? side === 'enemy'
                      ? 'bg-dire-500/20 text-dire-400'
                      : 'bg-radiant-500/20 text-radiant-400'
                    : 'text-mist-600 hover:bg-void-850 hover:text-mist-200'
                )}
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
          <span className="hidden text-[11px] text-mist-600 sm:inline">
            Повторный клик убирает героя · кнопка ИНФО открывает полный разбор
          </span>
        </div>

        <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_400px]">
          <HeroPool
            allies={allies}
            enemies={enemies}
            activeSide={activeSide}
            onPick={pick}
            onRemove={remove}
            onInspect={setInspected}
            inspected={inspected}
          />

          <div className="space-y-3">
            {inspected && (
              <HeroDetail
                key={inspected}
                name={inspected}
                onClose={() => setInspected(null)}
                onInspect={setInspected}
                onAdd={addTo}
              />
            )}
            <Advisor
              allies={allies}
              enemies={enemies}
              onPickAlly={(name) => addTo('ally', name)}
              onInspect={setInspected}
            />
            <DraftLibrary allies={allies} enemies={enemies} onLoad={loadDraft} />
          </div>
        </div>
      </div>
    </Page>
  );
}

