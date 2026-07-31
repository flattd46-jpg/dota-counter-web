import { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createQueryKey, modelenceMutation, modelenceQuery } from '@modelence/react-query';
import { useSession } from 'modelence/client';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { BookmarkPlus, FolderOpen, Loader2, Save, Trash2 } from 'lucide-react';
import { cn } from '@/client/lib/utils';
import { HeroImage } from './HeroImage';

interface SavedDraft {
  id: string;
  name: string;
  allies: string[];
  enemies: string[];
  updatedAt: string;
}

const LIST_KEY = createQueryKey('drafts.list', {});

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return 'только что';
  if (mins < 60) return `${mins} мин назад`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} ч назад`;
  return `${Math.round(hours / 24)} дн назад`;
}

export default function DraftLibrary({
  allies,
  enemies,
  onLoad,
}: {
  allies: string[];
  enemies: string[];
  onLoad: (draft: { allies: string[]; enemies: string[] }) => void;
}) {
  const { user } = useSession();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');

  const { data: drafts = [], isLoading } = useQuery({
    ...modelenceQuery<SavedDraft[]>('drafts.list', {}),
    enabled: Boolean(user),
  });

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: LIST_KEY });
  }, [queryClient]);

  const { mutate: save, isPending: isSaving } = useMutation({
    ...modelenceMutation('drafts.save'),
    onSuccess: () => {
      setName('');
      invalidate();
      toast.success('Драфт сохранён');
    },
  });

  const { mutate: remove } = useMutation({
    ...modelenceMutation('drafts.remove'),
    onSuccess: invalidate,
  });

  const picksMade = allies.length + enemies.length;

  if (!user) {
    return (
      <section className="panel animate-fade-in p-4">
        <h2 className="mb-1.5 flex items-center gap-2 font-display text-[13px] font-semibold tracking-[0.12em] uppercase text-mist-50">
          <FolderOpen className="size-3.5 text-ember-500" aria-hidden="true" />
          Мои драфты
        </h2>
        <p className="text-xs leading-relaxed text-mist-400">
          <Link to="/login" className="font-semibold text-ember-400 hover:text-ember-500">
            Войдите
          </Link>
          , чтобы сохранять составы и загружать их в следующей игре.
        </p>
      </section>
    );
  }

  return (
    <section className="panel animate-fade-in p-3 sm:p-4">
      <h2 className="mb-3 flex items-center gap-2 font-display text-[13px] font-semibold tracking-[0.12em] uppercase text-mist-50">
        <FolderOpen className="size-3.5 text-ember-500" aria-hidden="true" />
        Мои драфты
        <span className="label-caps ml-auto">сохранено: {drafts.length}</span>
      </h2>

      <form
        className="mb-3 flex gap-1.5"
        onSubmit={(e) => {
          e.preventDefault();
          if (picksMade === 0) {
            toast.error('Сначала выберите хотя бы одного героя');
            return;
          }
          save({ name: name.trim() || `Драфт ${drafts.length + 1}`, allies, enemies });
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          placeholder="Название драфта…"
          className="h-9 min-w-0 flex-1 rounded-md border border-void-700 bg-void-900 px-2.5 text-sm text-mist-50 transition-colors duration-200 placeholder:text-mist-600 focus:border-ember-500/70 focus:ring-1 focus:ring-ember-500/30 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isSaving || picksMade === 0}
          className="flex h-9 shrink-0 items-center gap-1.5 rounded-md bg-ember-500 px-3 text-[11px] font-bold tracking-[0.1em] uppercase text-void-950 transition-all duration-200 hover:bg-ember-400 hover:shadow-[0_0_20px_-6px_rgba(255,122,47,0.8)] disabled:pointer-events-none disabled:opacity-35"
        >
          {isSaving ? (
            <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <Save className="size-3.5" aria-hidden="true" />
          )}
          Сохранить
        </button>
      </form>

      {isLoading ? (
        <div className="space-y-1.5">
          {[0, 1].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded-md bg-void-850" />
          ))}
        </div>
      ) : drafts.length === 0 ? (
        <p className="flex items-center gap-2 py-3 text-xs text-mist-600">
          <BookmarkPlus className="size-4 shrink-0" aria-hidden="true" />
Пока ничего не сохранено — соберите состав и дайте ему название.
        </p>
      ) : (
        <ul className="max-h-64 space-y-1.5 overflow-y-auto pr-1">
          {drafts.map((draft, i) => (
            <li
              key={draft.id}
              style={{ animationDelay: `${i * 30}ms` }}
              className="group/draft animate-slide-up flex items-center gap-2 rounded-md border border-void-750 bg-void-900/60 p-2 transition-colors duration-200 hover:border-ember-500/40"
            >
              <button
                type="button"
                onClick={() => onLoad({ allies: draft.allies, enemies: draft.enemies })}
                className="min-w-0 flex-1 text-left"
                title="Загрузить этот драфт"
              >
                <span className="block truncate text-sm font-semibold text-mist-50">
                  {draft.name}
                </span>
                <span className="mt-1 flex items-center gap-1">
                  <Lineup names={draft.enemies} tone="ring-dire-500/50" />
                  <span className="text-[10px] text-mist-600">против</span>
                  <Lineup names={draft.allies} tone="ring-radiant-500/50" />
                  <span className="ml-auto shrink-0 text-[10px] text-mist-600">
                    {relativeTime(draft.updatedAt)}
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => remove({ id: draft.id })}
                title="Удалить драфт"
                className="shrink-0 rounded-sm p-1 text-mist-600 opacity-0 transition-all duration-200 group-hover/draft:opacity-100 hover:bg-dire-600/20 hover:text-dire-400"
              >
                <Trash2 className="size-3.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Lineup({ names, tone }: { names: string[]; tone: string }) {
  if (names.length === 0) {
    return <span className="text-[10px] text-mist-600">—</span>;
  }
  return (
    <span className="flex gap-0.5">
      {names.map((n) => (
        <HeroImage
          key={n}
          name={n}
          title={n}
          className={cn('h-4 w-6 rounded-[2px] ring-1', tone)}
        />
      ))}
    </span>
  );
}

