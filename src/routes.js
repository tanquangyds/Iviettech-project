import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import AuthLayout from './pages/Layouts/Auth';
import VerticalLayout from './pages/Layouts/Vertical';
import { AuthGuard, GuestGuard, LoadingScreen } from './components/RolesGuard/index';

import { ROUTES } from './constants/routes';

export const renderRoutes = (routes)=> {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          console.log(route.guard, route.title)
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;
          return (
            <Route
              key={i.toString()}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}

const routes = [
  {
    title: "Login",
    exact: true,
    path: ROUTES.LOGIN,
    component: lazy(() => import('./pages/SignIn/SignIn')),
  },
  {
    title: "Home",
    exact: true,
    path: ROUTES.HOME,
    layout: VerticalLayout,
    component: lazy(() => import('./pages/Home/Home')),
  },
  {
    title: "detail",
    exact: true,
    path: ROUTES.DETAIL,
    layout: VerticalLayout,
    component: lazy(() => import('./pages/Details/Details')),
  },
  {
    title: "Cart",
    exact: true,
    path: ROUTES.CART,
    layout: VerticalLayout,
    component: lazy(() => import('./pages/Cart/Cart')),
  },
  {
    title: "Checkout",
    path: ROUTES.CHECKOUT,
    guard: AuthGuard,
    layout: VerticalLayout,
    component: lazy(() => import('./pages/CheckOut/CheckOut')),
  },
  {
    path: '*',
    component: lazy(() => import('./pages/Notfound/Notfound')),
  }
];

export default routes;
