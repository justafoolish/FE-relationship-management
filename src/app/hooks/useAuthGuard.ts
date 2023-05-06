import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'app/reducers/store.hook';
import {
  updateAccessToken,
  updateLoginStatus,
  updateRefreshToken,
  updateUserInfo,
  userInfoSelector,
} from 'app/reducers/user/auth.slice';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const currentUser = useAppSelector(userInfoSelector);
  const authDispatch = useAppDispatch();

  const setAuthenticated = useCallback(() => {
    authDispatch(updateLoginStatus(true));
  }, []);

  const setAccessToken = useCallback((token = '') => {
    authDispatch(updateAccessToken(token));
  }, []);

  const setRefreshToken = useCallback((token = '') => {
    authDispatch(updateRefreshToken(token));
  }, []);

  const handleLogout = useCallback(() => {
    authDispatch(updateLoginStatus(false));
    authDispatch(updateAccessToken(''));
    authDispatch(updateUserInfo(undefined));
    navigate('/auth');
  }, []);

  return { setAccessToken, setAuthenticated, handleLogout, setRefreshToken, currentUser };
};

export default useAuthGuard;
