export const filterRoutes = (routes, user) => {
  if (user) {
    return routes.filter(
      (route) => route.path !== '/login' && route.path !== '/games/lobby/:id' && route.path !== '/games/session/:id',
    );
  } else {
    return routes.filter(
      (route) =>
        route.path !== '/signout' &&
        route.path !== '/games/lobby/:id' &&
        route.path !== '/games' &&
        route.path !== '/games/session/:id',
    );
  }
};
