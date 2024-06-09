export const filterRoutes = (routes, user) => {
  if (user) {
    return routes.filter((route) => route.path !== '/login' && route.path !== '/games/:id');
  } else {
    return routes.filter((route) => route.path !== '/signout' && route.path !== '/games/:id' && route.path !== '/games');
  }
};
