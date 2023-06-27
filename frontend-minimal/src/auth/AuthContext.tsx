'use client';

import { createContext, useEffect, useReducer, useCallback } from 'react';

import { Api } from '@/services/api';

import { ActionMapType, AuthStateType, AuthUserType, JWTContextType } from './types';

import { isValidToken, setSession } from './utils';

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  UPDATE_USER = 'UPDATE_USER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.UPDATE_USER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }

  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }

  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }

  if (action.type === Types.UPDATE_USER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }

  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

export const AuthContext = createContext<JWTContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const api = new Api();

  const initialize = useCallback(async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth.token') : '';

      if (token && isValidToken(token)) {
        const user = localStorage.getItem('auth.user') ? JSON.parse(localStorage.getItem('auth.user') as any) : null;

        setSession(token, user);

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = async (email: string, password: string) => {
    const response = await api.auth.login({
      email,
      password,
    });
    const { token, ...user } = response.data;

    setSession(token, user);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  };

  // REGISTER
  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    /* const response = await api.auth.register({
      email,
      password,
      firstName,
      lastName,
    });
    const { token, ...user } = response.data;

    dispatch({
      type: Types.REGISTER,
      payload: {
        user,
      },
    }); */
  };

  const updateUser = async (data: any, userId: number, refreshSession = false) => {
    /* const response = await api.user.update(data, userId);
    const { token, ...user } = response.data;

    if (refreshSession) {
      setSession(token, user);

      dispatch({
        type: Types.UPDATE_USER,
        payload: {
          user,
        },
      });
    } */
  };

  // LOGOUT
  const logout = async () => {
    setSession(null, null);
    dispatch({
      type: Types.LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
