/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'app/reducers/store.hook';
import { updateAccessToken, updateLoginStatus, updateRefreshToken, updateUserInfo, userInfoSelector } from 'app/reducers/user/auth.slice';

/**
 * setAuthenticated: update login status
 *
 * setAccessToken: update access token
 *
 * setRefreshToken: update refresh token
 *
 * handleLogout: logout
 */
const useAuthGuard = () => {
  const currentUser = useAppSelector(userInfoSelector);
  const authDispatch = useAppDispatch();

  const setAuthenticated = useCallback(() => {
    authDispatch(updateLoginStatus(true));
  }, []);

  const setAccessToken = useCallback((token: string = '') => {
    authDispatch(updateAccessToken(token));
  }, []);

  const setRefreshToken = useCallback((token: string = '') => {
    authDispatch(updateRefreshToken(token));
  }, []);

  const handleLogout = useCallback(() => {
    authDispatch(updateLoginStatus(false));
    authDispatch(updateAccessToken(''));
    authDispatch(updateUserInfo(undefined));
  }, []);

  return { setAccessToken, setAuthenticated, handleLogout, setRefreshToken, currentUser };
};

export default useAuthGuard;
