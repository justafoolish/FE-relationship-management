/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';

import { useAppDispatch } from 'app/reducers/store.hook';
import { updateAccessToken, updateLoginStatus, updateRefreshToken, updateUserInfo } from 'app/reducers/user/auth.slice';

const useAuthGuard = () => {
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

  return { setAccessToken, setAuthenticated, handleLogout, setRefreshToken };
};

export default useAuthGuard;
