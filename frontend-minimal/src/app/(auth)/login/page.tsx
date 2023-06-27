'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { api } from '@/services/api';

import styles from './styles.module.css';

export default function LoginPage() {
  const { push } = useRouter();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await api.post('/login', {
      email,
      password,
    });

    push('/');
  }

  return (
    <form className={styles.wrapper} onSubmit={(e) => handleSubmit(e)}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">ENTRAR</button>
    </form>
  );
}
