import { getAuthenticated, deleteToken, deleteUser, setLogout } from '@/services/auth';
import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';

function Auth(props) {
  const isAuthenicated = getAuthenticated();

  return isAuthenicated ? props.children : <Navigate to="/login" replace />;
}

export default Auth;
