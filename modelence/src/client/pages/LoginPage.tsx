import React, { useCallback } from 'react';
import { getConfig, loginWithPassword } from 'modelence/client';
import { Link } from 'react-router-dom';
import Page from '@/client/components/Page';
import AuthCard, {
  authButtonClass,
  authFieldClass,
  authLabelClass,
} from '@/client/components/AuthCard';

export default function LoginPage() {
  return (
    <Page seo={{ title: 'Вход', noindex: true }}>
      <div className="flex min-h-full items-center justify-center py-10">
        <LoginForm />
      </div>
    </Page>
  );
}

function LoginForm() {
  const isSandboxEnv = getConfig('_system.env.type') === 'sandbox';
  const defaultDemoEmail = isSandboxEnv
    ? (getConfig('example.modelenceDemoUsername') as string | undefined)
    : undefined;
  const defaultDemoPassword = isSandboxEnv
    ? (getConfig('example.modelenceDemoPassword') as string | undefined)
    : undefined;

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await loginWithPassword({ email, password });
  }, []);

  return (
    <AuthCard
      title="Вход"
      subtitle="Вернуться в штаб драфта"
      footer={
        <>
          Ещё нет аккаунта?{' '}
          <Link to="/signup" className="font-semibold text-ember-400 hover:text-ember-500">
            Зарегистрироваться
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className={authLabelClass}>
            Эл. почта
          </label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={defaultDemoEmail}
            className={authFieldClass}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className={authLabelClass}>
            Пароль
          </label>
          <input
            type="password"
            name="password"
            id="password"
            defaultValue={defaultDemoPassword}
            className={authFieldClass}
            required
          />
        </div>

        <button type="submit" className={authButtonClass}>
          Войти
        </button>
      </form>
    </AuthCard>
  );
}

