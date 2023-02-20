import React from 'react';
import { Outlet } from 'react-router';
import AdminLayout from '@/layouts/AdminLayout';

function App(props) {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

export default App;
