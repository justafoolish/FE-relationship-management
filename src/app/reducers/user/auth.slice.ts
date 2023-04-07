import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IUserInfo } from 'app/domains/user/user.i';
import { accountAPI } from '../account/account.api';

export interface IAuthState {
  accessToken?: string;
  user?: IUserInfo;
  authenticated?: boolean;
  refreshToken?: string;
}

const initAuthState: IAuthState = {
  accessToken: '',
  refreshToken: '',
  user: undefined,
  authenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initAuthState,
  reducers: {
    updateAccessToken: (state, { payload }: PayloadAction<string | undefined>) => {
      state.accessToken = payload;
    },
    updateUserInfo: (state, { payload }: PayloadAction<IUserInfo | undefined>) => {
      state.user = payload;
    },
    updateLoginStatus: (state, { payload }: PayloadAction<boolean>) => {
      state.authenticated = payload;
    },
    updateRefreshToken: (state, { payload }: PayloadAction<string | undefined>) => {
      state.refreshToken = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(accountAPI.endpoints.getUserInfo.matchFulfilled, (state, { payload }) => {
      state.user = payload.data;
    });
  },
});

const accessTokenSelector = (state: RootState) => state.auth.accessToken;
const userInfoSelector = (state: RootState) => state.auth.user;

export { accessTokenSelector, userInfoSelector };

export const { updateAccessToken, updateUserInfo, updateLoginStatus, updateRefreshToken } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
