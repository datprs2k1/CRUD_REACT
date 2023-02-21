import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login/Login';
import Home from '@/pages/Home/Home';
import Auth from '@/components/Auth';

const router = createBrowserRouter([
  {
    path: 'admin',
    element: <App />,
    children: [
      {
        path: '',
        element: (
          <Auth>
            <Home />
          </Auth>
        ),
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
]);

export default router;
