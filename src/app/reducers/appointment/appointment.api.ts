import { createApi } from '@reduxjs/toolkit/query/react';
import BaseResponse from 'app/domains/rtk/base.response';
import { IUserInfo } from 'app/domains/user/user.i';
import baseQueryWithAuth from '../base.auth';
import { appointmentURL } from '../rtk.config';

export const appointmentAPI = createApi({
  baseQuery: baseQueryWithAuth(appointmentURL),
  reducerPath: 'appointmentAPI',
  endpoints: (builder) => ({
    getListAppointment: builder.query<BaseResponse<IUserInfo>, void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
    }),
    createAppointment: builder.mutation<BaseResponse<IUserInfo>, void>({
      query: () => ({
        url: '/create',
        method: 'POST',
      }),
    }),
    updateAppointment: builder.mutation<BaseResponse<IUserInfo>, void>({
      query: () => ({
        url: '/:id',
        method: 'POST',
      }),
    }),
    deleteAppointment: builder.mutation<BaseResponse<IUserInfo>, void>({
      query: () => ({
        url: '/:id',
        method: 'DELETE',
      }),
    }),
    getAppointmentDetail: builder.query<BaseResponse<IUserInfo>, void>({
      query: () => ({
        url: '/:id',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetListAppointmentQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetAppointmentDetailQuery,
} = appointmentAPI;
