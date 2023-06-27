'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function IndexPage() {
  const { push } = useRouter();

  useEffect(() => {
    push('/home');
  }, []);

  // Renderiza um componente vazio
  return null;
}
