import useAuthGuard from 'app/hooks/useAuthGuard';
import { handleQueryError } from 'app/modules/utils/error-handler';
import { useGetUserInfoQuery } from 'app/reducers/api';
import { useAppSelector } from 'app/reducers/store.hook';
import { accessTokenSelector } from 'app/reducers/user/auth.slice';
import { FC, useEffect, useRef, useState } from 'react';
import { WithChildren } from '../../../../_metronic/helpers';
import { LayoutSplashScreen } from '../../../../_metronic/layout/core';

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { handleLogout } = useAuthGuard();
  const { refetch } = useGetUserInfoQuery(undefined, { skip: true });

  const didRequest = useRef(false);
  const accessToken = useAppSelector(accessTokenSelector);
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          await refetch().unwrap();
        }
      } catch (error) {
        handleQueryError(error);

        if (!didRequest.current) {
          handleLogout();
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    if (accessToken) {
      requestUser();
    } else {
      handleLogout();
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export { AuthInit };
