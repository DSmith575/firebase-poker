export const filterRoutes = (routes, user) => {
  if (user) {
    return routes.filter(
      (route) =>
        route.path !== '/login' &&
        route.path !== '/games/lobby/:gameId' &&
        route.path !== '/games/session/:gameId' &&
        route.path !== '/games/session/:gameId/endScreen',
    );
  } else {
    return routes.filter(
      (route) =>
        route.path !== '/signout' &&
        route.path !== '/games/lobby/:gameId' &&
        route.path !== '/games' &&
        route.path !== '/games/session/:gameId' &&
        route.path !== '/games/session/:gameId/endScreen',
    );
  }
};
