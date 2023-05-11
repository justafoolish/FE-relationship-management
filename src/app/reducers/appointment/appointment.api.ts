import { createApi } from '@reduxjs/toolkit/query/react';
import { ICreateAppointmentRequest, IListAppointment } from 'app/domains/appointment/appointment.i';
import { PaginationRequest } from 'app/domains/rtk/base.request';
import BaseResponse, { PaginationResponse } from 'app/domains/rtk/base.response';
import { IUserInfo } from 'app/domains/user/user.i';
import baseQueryWithAuth from '../base.auth';
import { appointmentURL } from '../rtk.config';

export const appointmentAPI = createApi({
  baseQuery: baseQueryWithAuth(appointmentURL),
  reducerPath: 'appointmentAPI',
  endpoints: (builder) => ({
    getListAppointment: builder.query<
      BaseResponse<PaginationResponse<Partial<IListAppointment>>>,
      Partial<PaginationRequest>
    >({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
    }),
    createAppointment: builder.mutation<BaseResponse<IUserInfo>, Partial<ICreateAppointmentRequest>>({
      query: (body) => ({
        url: '/create',
        method: 'POST',
        body,
      }),
    }),
    updateAppointment: builder.mutation<BaseResponse<IUserInfo>, void>({
      query: () => ({
        url: '/:id',
        method: 'POST',
      }),
    }),
    deleteAppointment: builder.mutation<BaseResponse<any>, string | number | undefined>({
      query: (id) => ({
        url: `/${id}`,
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
