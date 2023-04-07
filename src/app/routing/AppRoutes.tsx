import { useAppSelector } from 'app/reducers/store.hook';
import { isAuthenticatedSelector } from 'app/reducers/user/auth.slice';
import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from '../App';
import { PrivateRoutes } from './PrivateRoutes';
import { AuthPage } from 'app/modules/auth/AuthPage';
import { ErrorsPage } from 'app/modules/errors/ErrorsPage';
import { Logout } from 'app/modules/auth';

const { PUBLIC_URL } = process.env;

const AppRoutes: FC = () => {
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />
          {isAuthenticated ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
