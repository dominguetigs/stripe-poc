import Service from '@/services/api/request';

const PATH_AUTH_LOGIN = '/login';

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export const isValidToken = (token: string) => {
  if (!token) {
    return false;
  }

  const decoded = jwtDecode(token);

  if (!decoded.exp) {
    return true;
  }

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

export const tokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');

    localStorage.removeItem('auth.token');

    window.location.href = PATH_AUTH_LOGIN;
  }, timeLeft);
};

export const setSession = (token: string | null, user: any) => {
  if (token) {
    localStorage.setItem('auth.token', token);

    if (user) {
      localStorage.setItem('auth.user', JSON.stringify(user));
    }

    Service.service.defaults.headers['Authorization'] = `Bearer ${token}`;

    // This function below will handle when token is expired
    // const { exp } = jwtDecode(token); // ~3 days by minimals server
    // tokenExpired(exp);
  } else {
    localStorage.removeItem('auth.token');
    localStorage.removeItem('auth.user');

    delete Service.service.defaults.headers['Authorization'];
  }
};
