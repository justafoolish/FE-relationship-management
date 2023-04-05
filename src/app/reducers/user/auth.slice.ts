import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface IAuthState {
  accessToken?: string;
}

const initAuthState: IAuthState = {
  accessToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initAuthState,
  reducers: {
    updateAccessToken: (state, { payload }: PayloadAction<string>) => {
      state.accessToken = payload;
    },
  },
});

const accessTokenSelector = (state: RootState) => state.math;

export { accessTokenSelector };

export const { updateAccessToken } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
