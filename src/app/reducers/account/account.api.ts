import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithAuth from '../base.auth';
import { accountURL } from '../rtk.config';
import { IJWT, IUserInfo } from 'app/domains/user/user.i';
import BaseResponse from 'app/domains/rtk/base.response';

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
    getUserInfo: builder.query<BaseResponse<IUserInfo>, void>({
      query: () => ({
        url: '/',
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
    submitRegister: builder.mutation<BaseResponse<any>, IRegisterRequest>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSubmitLoginMutation, useSubmitRegisterMutation, useGetUserInfoQuery } = accountAPI;
