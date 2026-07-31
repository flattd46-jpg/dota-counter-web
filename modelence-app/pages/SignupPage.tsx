import React, { useCallback, useState } from 'react';
import { signupWithPassword } from 'modelence/client';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Page from '@/client/components/Page';
import AuthCard, {
  authButtonClass,
  authFieldClass,
  authLabelClass,
} from '@/client/components/AuthCard';

export default function SignupPage() {
  return (
    <Page seo={{ title: 'Регистрация', noindex: true }}>
      <div className="flex min-h-full items-center justify-center py-10">
        <SignupForm />
      </div>
    </Page>
  );
}

function SignupForm() {
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const confirmPassword = String(formData.get('confirmPassword'));

    if (password !== confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }

    try {
      await signupWithPassword({ email, password });
      setIsSignupSuccess(true);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, []);

  if (isSignupSuccess) {
    return (
      <AuthCard title="Аккаунт создан" subtitle="Штаб драфта готов к работе">
        <Link to="/login" className={`${authButtonClass} flex items-center justify-center`}>
          Войти
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Регистрация"
      subtitle="Сохраняйте свои драфты и разборы"
      footer={
        <>
          Уже есть аккаунт?{' '}
          <Link to="/login" className="font-semibold text-ember-400 hover:text-ember-500">
            Войти
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className={authLabelClass}>
            Эл. почта
          </label>
          <input type="email" name="email" id="email" className={authFieldClass} required />
        </div>

        <div>
          <label htmlFor="password" className={authLabelClass}>
            Пароль
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={authFieldClass}
            required
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className={authLabelClass}>
            Повторите пароль
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirm-password"
            className={authFieldClass}
            required
          />
        </div>

        <label htmlFor="consent-terms" className="flex items-start gap-2 text-xs text-mist-400">
          <input
            id="consent-terms"
            type="checkbox"
            name="consent-terms"
            className="mt-0.5 size-3.5 accent-ember-500"
            required
          />
          <span>
            Я принимаю{' '}
            <a
              className="font-semibold text-ember-400 hover:text-ember-500"
              href="/terms"
              target="_blank"
              rel="noreferrer"
            >
              условия использования
            </a>
          </span>
        </label>

        <button type="submit" className={authButtonClass}>
          Создать аккаунт
        </button>
      </form>
    </AuthCard>
  );
}

