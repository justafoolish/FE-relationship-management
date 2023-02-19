import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('pages/home'));

const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
];

export default routesConfig;
