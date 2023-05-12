import useAuthGuard from 'app/hooks/useAuthGuard';
import { handleQueryError } from 'app/modules/utils/error-handler';
import { useGetAllNotificationQuery, useGetUserInfoMutation } from 'app/reducers/api';
import { useAppSelector } from 'app/reducers/store.hook';
import { accessTokenSelector } from 'app/reducers/user/auth.slice';
import { pusherChannel } from 'app/utils/pusher';
import { FC, useEffect, useRef, useState } from 'react';
import { WithChildren } from '../../../../_metronic/helpers';
import { LayoutSplashScreen } from '../../../../_metronic/layout/core';
import notification from 'antd/lib/notification';
import {
  INotification,
  NOTIFICATION_BADGE_STATUS,
  NOTIFICATION_TYPE,
} from 'app/domains/notification/notification.i';

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { handleLogout } = useAuthGuard();
  const [getUserInfo] = useGetUserInfoMutation();
  const { refetch: fetchNotification } = useGetAllNotificationQuery(undefined);
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

    pusherChannel.bind(`people_notification_${userId}`, (data: INotification) => {
      console.log(data);

      const getDescription = (_noti: INotification) => {
        switch (_noti.type) {
          case NOTIFICATION_TYPE.APPOINTMENT:
            return `Schedule at ${_noti.info?.date_meeting} `;
          case NOTIFICATION_TYPE.RELATIONSHIP:
            return `Contact ${_noti.info?.full_name} `;
          default:
            throw new Error('Invalid notification type');
        }
      };

      notification.info({
        message: NOTIFICATION_BADGE_STATUS[data.type].title,
        description: getDescription(data),
      });

      fetchNotification();
    });
  }, [userId]);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export { AuthInit };
