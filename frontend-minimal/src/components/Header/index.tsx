'use client';

import styles from './styles.module.css';

export const Header = () => {
  function handleLogout() {}

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
