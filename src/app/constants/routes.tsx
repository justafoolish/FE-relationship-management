import { getCSSVariableValue } from '_metronic/assets/ts/_utils';
import { WithChildren } from '_metronic/helpers';
import { MasterLayout } from '_metronic/layout/MasterLayout';
import { AccountHeader } from 'app/modules/accounts/AccountHeader';
import { FC, Suspense, lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

// app
const App = lazy(() => import('app/App'));

// layout
const AuthLayout = lazy(() => import('app/modules/auth/AuthLayout'));

// auth
const Registration = lazy(() => import('app/modules/auth/components/Registration'));
const Login = lazy(() => import('app/modules/auth/components/Login'));
const ForgotPassword = lazy(() => import('app/modules/auth/components/ForgotPassword'));
const Logout = lazy(() => import('app/modules/auth/Logout'));

// pages
const UserProfilePage = lazy(() => import('app/pages/user-profile/UserProfile'));
const UserSettingPage = lazy(() => import('app/pages/user-profile/UserSetting'));
const AllPeoplePage = lazy(() => import('app/pages/all-people/AllPeople'));
const AppointmentPage = lazy(() => import('app/pages/appointment/Appointment'));
const ErrorsPage = lazy(() => import('app/modules/errors/ErrorsPage'));

// crafted
// const ProfilePage = lazy(() => import('app/modules/profile/ProfilePage'));
// const WizardsPage = lazy(() => import('app/modules/wizards/WizardsPage'));
// const AccountPage = lazy(() => import('app/modules/accounts/AccountPage'));
// const WidgetsPage = lazy(() => import('app/modules/widgets/WidgetsPage'));
// const ChatPage = lazy(() => import('app/modules/apps/chat/ChatPage'));
// const UsersPage = lazy(() => import('app/modules/apps/user-management/UsersPage'));

// suspense view
const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--kt-primary');
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

type IGetRoute = (isAuthenticated?: boolean) => RouteObject;

export const rootRoutes: IGetRoute = (isAuthenticated) => ({
  path: '/',
  element: <App />,
  children: [
    { path: 'error/*', element: <ErrorsPage /> },
    { path: 'logout', element: <Logout /> },
    ...(isAuthenticated
      ? ([
          {
            // private route
            path: '/*',
            element: (
              <SuspensedView>
                <MasterLayout />
              </SuspensedView>
            ),
            children: [
              // layout
              { path: 'auth/*', element: <Navigate to="/dashboard" /> },

              // pages
              { path: 'dashboard', element: <Navigate to="/c-user" /> },
              {
                path: 'c-user',
                element: (
                  <>
                    <AccountHeader />
                    <Outlet />
                  </>
                ),
                children: [
                  { index: true, element: <Navigate to="profile" /> },
                  { path: 'profile', element: <UserProfilePage /> },
                  { path: 'setting', element: <UserSettingPage /> },
                ],
              },
              { path: 'all-people', element: <AllPeoplePage /> },
              { path: 'appointment', element: <AppointmentPage /> },

              // error
              { path: '*', element: <Navigate to="/error/404" /> },
            ],
          },
          { index: true, element: <Navigate to="/c-user" /> },
        ] as RouteObject[])
      : ([
          {
            path: 'auth/*',
            element: <AuthLayout />,
            children: [
              { path: 'login', element: <Login /> },
              { path: 'registration', element: <Registration /> },
              { path: 'forgot-password', element: <ForgotPassword /> },
              { index: true, element: <Login /> },
            ],
          },
          { index: true, element: <Navigate to="/auth" /> },
          { index: '*', element: <Navigate to="/auth" /> },
        ] as RouteObject[])),
  ],
});
