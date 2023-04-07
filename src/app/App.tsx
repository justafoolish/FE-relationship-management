import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { I18nProvider } from '../_metronic/i18n/i18nProvider';
import { LayoutProvider, LayoutSplashScreen } from '../_metronic/layout/core';
import { MasterInit } from '../_metronic/layout/MasterInit';
import { AuthInit } from 'app/modules/auth';

const CustomToast = lazy(() => import('app/components/custom-toast/CustomToast'));

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <Outlet />
            <MasterInit />
            <CustomToast />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  );
};

export { App };
