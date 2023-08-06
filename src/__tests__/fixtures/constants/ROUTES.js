export const PROTECTED_ROUTES = [
  { route: '/', method: 'get' },
  { route: '/users/me', method: 'get' },
  { route: '/users/me', method: 'patch' },
  { route: '/movies', method: 'get' },
  { route: '/movies', method: 'post' },
  { route: '/movies/_id', method: 'delete' },
  { route: '/crash-test', method: 'post' },
  { route: '/sign-out', method: 'post' },
];

export const NOT_PROTECTED_ROUTES = [
  { route: '/signin', method: 'post' },
  { route: '/signup', method: 'post' },
];

export const ALL_ROUTES = [
  ...PROTECTED_ROUTES,
  ...NOT_PROTECTED_ROUTES,
];
