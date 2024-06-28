import { ROUTE_LABELS } from '../../router/routerLabels';

const excludedRoutesForAuthenticated = [ROUTE_LABELS.LOGIN, ROUTE_LABELS.GAME_LOBBY, ROUTE_LABELS.POKER, ROUTE_LABELS.END_SCREEN];

const excludedRoutesForUnauthenticated = [
  ROUTE_LABELS.SIGN_OUT,
  ROUTE_LABELS.GAME_LOBBY,
  ROUTE_LABELS.GAMES,
  ROUTE_LABELS.POKER,
  ROUTE_LABELS.END_SCREEN,
];

export const filterRoutes = (routes, user) => {
  const excludedRoutes = user ? excludedRoutesForAuthenticated : excludedRoutesForUnauthenticated;
  return routes.filter((route) => !excludedRoutes.includes(route.label));
};
