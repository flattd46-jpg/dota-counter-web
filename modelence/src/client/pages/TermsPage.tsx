import Page from '@/client/components/Page';

const SECTIONS: { title: string; text: string }[] = [
  {
    title: '1. Принятие условий',
    text: 'Открывая и используя этот сайт, вы соглашаетесь с изложенными здесь условиями. Если вы с ними не согласны, не пользуйтесь сервисом.',
  },
  {
    title: '2. Назначение сервиса',
    text: 'Counter Web — вспомогательный инструмент для драфта в Dota 2. Рекомендации основаны на статических таблицах матчапов и не гарантируют исход игры.',
  },
  {
    title: '3. Аккаунт и данные',
    text: 'Аккаунт нужен только для сохранения ваших составов. Мы храним адрес электронной почты и сохранённые драфты; их можно удалить в любой момент прямо в разделе «Мои драфты».',
  },
  {
    title: '4. Товарные знаки',
    text: 'Dota 2, названия героев, предметов и изображения принадлежат Valve Corporation. Проект не связан с Valve и не является официальным.',
  },
  {
    title: '5. Ответственность',
    text: 'Сервис предоставляется «как есть», без гарантий доступности и точности данных.',
  },
];

export default function TermsPage() {
  return (
    <Page seo={{ title: 'Условия использования' }}>
      <div className="mx-auto max-w-3xl px-3 py-6 sm:px-5">
        <div className="panel animate-slide-up p-5 sm:p-6">
          <h1 className="font-display text-xl font-bold tracking-[0.06em] uppercase text-mist-50">
            Условия использования
          </h1>
          <p className="mt-2 text-sm text-mist-400">
            Коротко о том, как работает сервис и что происходит с вашими данными.
          </p>

          <div className="mt-5 space-y-4 border-t border-void-750 pt-5">
            {SECTIONS.map((s) => (
              <section key={s.title}>
                <h2 className="text-sm font-semibold text-mist-50">{s.title}</h2>
                <p className="mt-1 text-[13px] leading-relaxed text-mist-400">{s.text}</p>
              </section>
            ))}
          </div>

          <p className="mt-5 border-t border-void-750 pt-3 text-[11px] text-mist-600">
            Обновлено: {new Date().toLocaleDateString('ru-RU')}
          </p>
        </div>
      </div>
    </Page>
  );
}

