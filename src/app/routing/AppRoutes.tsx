import { LayoutSplashScreen } from '_metronic/layout/core/MetronicSplashScreen';
import { rootRoutes } from 'app/constants/routes';
import { useAppSelector } from 'app/reducers/store.hook';
import { isAuthenticatedSelector } from 'app/reducers/user/auth.slice';
import { FC, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

const AppRoutes: FC = () => {
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);
  const rootRoutesElement = useRoutes([rootRoutes(isAuthenticated)]);

  return <Suspense fallback={<LayoutSplashScreen />}>{rootRoutesElement}</Suspense>;
};

export { AppRoutes };
