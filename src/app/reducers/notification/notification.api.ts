import { createApi } from '@reduxjs/toolkit/query/react';
import { INotification } from 'app/domains/notification/notification.i';
import BaseResponse from 'app/domains/rtk/base.response';
import baseQueryWithAuth from '../base.auth';
import { notificationURL } from '../rtk.config';

export const notificationAPI = createApi({
  baseQuery: baseQueryWithAuth(notificationURL),
  reducerPath: 'notificationAPI',
  endpoints: (builder) => ({
    getAllNotification: builder.query<BaseResponse<INotification[]>, void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllNotificationQuery } = notificationAPI;
