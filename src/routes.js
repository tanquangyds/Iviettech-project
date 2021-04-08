import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import AuthLayout from './pages/Layouts/Auth';
import VerticalLayout from './pages/Layouts/Vertical';
import { AuthGuard, GuestGuard, LoadingScreen } from './components/index';

import { ROUTES } from './common/constants/routes';

export const renderRoutes = (routes)=> (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;
        console.log(route)
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

const routes = [
  {
    path: ROUTES.HOME,
    guard: GuestGuard,
    layout: VerticalLayout,
    component: lazy(() => import('./pages/Home/Home')),
  },
  {
    path: ROUTES.DETAIL,
    guard: GuestGuard,
    layout: VerticalLayout,
    component: lazy(() => import('./pages/Details/Details')),
  },
  {
    path: ROUTES.CART,
    guard: GuestGuard,
    layout: VerticalLayout,
    component: lazy(() => import('./pages/Cart/Cart')),
  },
  {
    path: ROUTES.PAYMENT,
    guard: AuthGuard,
    layout: AuthLayout,
    routes: [
      {
        exact: true,
        path: ROUTES.PAYMENT,
        component: () => <Redirect to={ROUTES.PAYMENT} />,
      },
      {
        component: () => <Redirect to={ROUTES.NOTFOUND} />,
      },
    ],
  },
  {
    exact: true,
    path: ROUTES.NOTFOUND,
    component: lazy(() => import('./pages/Notfound/Notfound')),
  },
  {
    exact: true,
    guard: GuestGuard,
    path: ROUTES.LOGIN,
    component: lazy(() => import('./pages/SignIn/SignIn')),
  },
];

export default routes;
