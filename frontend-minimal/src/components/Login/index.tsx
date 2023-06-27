'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthContext } from '@/auth/useAuthContext';

import styles from './styles.module.css';

export const Login = () => {
  const { login } = useAuthContext();

  const { push } = useRouter();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await login(email, password);
  }

  return (
    <form className={styles.wrapper} onSubmit={(e) => handleSubmit(e)}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">ENTRAR</button>
    </form>
  );
};
