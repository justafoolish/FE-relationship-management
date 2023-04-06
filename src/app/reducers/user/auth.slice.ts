import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IUserInfo } from 'app/domains/user/user.i';

export interface IAuthState {
  accessToken?: string;
  user?: IUserInfo;
  authenticated?: boolean;
}

const initAuthState: IAuthState = {
  accessToken: '',
  user: undefined,
  authenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initAuthState,
  reducers: {
    updateAccessToken: (state, { payload }: PayloadAction<string>) => {
      state.accessToken = payload;
    },
    updateUserInfo: (state, { payload }: PayloadAction<IUserInfo | undefined>) => {
      state.user = payload;
    },
    updateLoginStatus: (state, { payload }: PayloadAction<boolean>) => {
      state.authenticated = payload;
    },
  },
});

const accessTokenSelector = (state: RootState) => state.auth.accessToken;
const userInfoSelector = (state: RootState) => state.auth.user;

export { accessTokenSelector, userInfoSelector };

export const { updateAccessToken, updateUserInfo, updateLoginStatus } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
