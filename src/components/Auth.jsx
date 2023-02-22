import { getAuthenticated, deleteToken, deleteUser } from '@/services/auth';
import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { getToken } from '@services/auth';

function Auth(props) {
  const isAuthenicated = getAuthenticated();

  const token = JSON.parse(getToken());

  const now = new Date().getTime();

  if (token.expiredAt < now) {
    deleteToken();
    deleteUser();
    deleteAuthenticated();
  }

  return isAuthenicated ? props.children : <Navigate to="/login" replace />;
}

export default Auth;
