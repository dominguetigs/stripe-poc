'use client';

import { useState, useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { Login } from '@/components/Login';

import { useAuthContext } from './useAuthContext';

type AuthGuardProps = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated, isInitialized } = useAuthContext();

  /* const { push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }

    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation]); */

  if (!isInitialized) {
    return 'Loading...';
  }

  /* if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    return <Login />;
  } */

  return <>{children}</>;
};
