import React, { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/index';
import { ROUTES } from '../../common/constants/routes';


export const AuthGuard = (props) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to={ROUTES.LOGIN} />;
  }

  return <>{props.children}</>;
};
