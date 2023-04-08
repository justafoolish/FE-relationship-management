import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const App = lazy(() => import('app/App'));
const Logout = lazy(() => import('app/modules/auth/Logout'));
const AuthPage = lazy(() => import('app/modules/auth/AuthPage'));
const PrivateRoutes = lazy(() => import('app/routing/PrivateRoutes'));
const ErrorsPage = lazy(() => import('app/modules/errors/ErrorsPage'));

type IGetRoute = (isAuthenticated?: boolean) => RouteObject[];

export const rootRoutes: IGetRoute = (isAuthenticated) => [
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'error/*', element: <ErrorsPage /> },
      { path: 'logout', element: <Logout /> },
      ...(isAuthenticated
        ? [
            { path: '/*', element: <PrivateRoutes /> },
            { index: true, element: <Navigate to="/dashboard" /> },
          ]
        : [
            { path: 'auth/*', element: <AuthPage /> },
            { path: '*', element: <Navigate to="/auth" /> },
          ]),
    ],
  },
];
