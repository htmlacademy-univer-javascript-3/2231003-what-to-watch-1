import {Navigate} from 'react-router-dom';
import React from 'react';
import {AppRoute, AuthorizationStatus} from '../../const';

type Props = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = (props) => {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SingIn}/>
  );
};

export default PrivateRoute;
