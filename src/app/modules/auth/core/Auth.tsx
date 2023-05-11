import useAuthGuard from 'app/hooks/useAuthGuard';
import { handleQueryError } from 'app/modules/utils/error-handler';
import { useGetUserInfoMutation } from 'app/reducers/api';
import { useAppSelector } from 'app/reducers/store.hook';
import { accessTokenSelector } from 'app/reducers/user/auth.slice';
import { pusherChannel } from 'app/utils/pusher';
import { FC, useEffect, useRef, useState } from 'react';
import { WithChildren } from '../../../../_metronic/helpers';
import { LayoutSplashScreen } from '../../../../_metronic/layout/core';
import notification from 'antd/lib/notification';

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { handleLogout } = useAuthGuard();
  const [getUserInfo] = useGetUserInfoMutation();

  const didRequest = useRef(false);
  const accessToken = useAppSelector(accessTokenSelector);
  const userId = useAppSelector((app) => app.auth.user?.id);
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          await getUserInfo().unwrap();
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
  }, []);

  useEffect(() => {
    if (!userId) {
      pusherChannel.unbind();
      return;
    }

    pusherChannel.bind(`people_notification_${userId}`, (data: any) => {
      notification.open({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    });
  }, [userId]);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export { AuthInit };
