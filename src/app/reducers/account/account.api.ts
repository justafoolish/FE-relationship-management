import { createApi } from '@reduxjs/toolkit/query/react';
import BaseResponse from 'app/domains/rtk/base.response';
import { IJWT, IUserInfo } from 'app/domains/user/user.i';
import baseQueryWithAuth from '../base.auth';
import { accountURL } from '../rtk.config';
import { IUpdatePassword } from './../../modules/accounts/components/settings/SettingsModel';

interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  userInfo?: IUserInfo;
  jwt?: IJWT;
}

interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number: number;
}

export const accountAPI = createApi({
  baseQuery: baseQueryWithAuth(accountURL),
  reducerPath: 'accountAPI',
  endpoints: (builder) => ({
    getUserInfo: builder.mutation<BaseResponse<IUserInfo>, void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
    }),
    submitLogin: builder.mutation<BaseResponse<ILoginResponse>, ILoginRequest>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    getRefreshToken: builder.mutation<BaseResponse<ILoginResponse>, void>({
      query: () => ({
        url: '/refresh-token',
        method: 'POST',
      }),
    }),
    submitRegister: builder.mutation<BaseResponse<any>, IRegisterRequest>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
    }),
    resendRegisterLink: builder.mutation<BaseResponse<any>, void>({
      query: () => ({
        url: '/re-send-link',
        method: 'PATCH',
        params: {
          type: 'register',
        },
      }),
    }),

    updatePassword: builder.mutation<BaseResponse<any>, IUpdatePassword>({
      query: (body) => ({
        url: '/change-password',
        method: 'PUT',
        body,
      }),
    }),

    updateUserInfo: builder.mutation<BaseResponse<any>, Partial<IUserInfo>>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useSubmitLoginMutation,
  useSubmitRegisterMutation,
  useGetUserInfoMutation,
  useGetRefreshTokenMutation,
  useResendRegisterLinkMutation,
  useUpdatePasswordMutation,
  useUpdateUserInfoMutation,
} = accountAPI;
