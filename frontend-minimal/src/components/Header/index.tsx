'use client';

import { useAuthContext } from '@/auth/useAuthContext';

import styles from './styles.module.css';

export const Header = () => {
  const { logout } = useAuthContext();

  function handleLogout() {
    logout();
  }

  return (
    <header className={styles.header}>
      <span>Produtos</span>
      <div className={styles.menu}>
        <button onClick={() => handleLogout()}>Meu pedidos</button>
        <button onClick={() => handleLogout()}>Sair</button>
      </div>
    </header>
  );
};
