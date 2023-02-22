import { getAuthenticated, deleteToken, deleteUser, setLogout } from '@/services/auth';
import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { getToken } from '@services/auth';

function Auth(props) {
  const token = JSON.parse(getToken());

  if (!token) {
    setLogout();
  }

  if (token.expriedAt < new Date().getTime()) {
    setLogout();
  }

  const isAuthenicated = getAuthenticated();

  return isAuthenicated ? props.children : <Navigate to="/login" replace />;
}

export default Auth;
