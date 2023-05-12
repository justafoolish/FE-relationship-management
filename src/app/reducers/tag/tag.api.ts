import { createApi } from '@reduxjs/toolkit/query/react';
import BaseResponse from 'app/domains/rtk/base.response';
import baseQueryWithAuth from '../base.auth';
import { tagURL } from '../rtk.config';

interface ITags {
  id: number | string;
  name: string;
  user_id: string | number;
  created_at: string;
  updated_at: string;
}

export const tagAPI = createApi({
  baseQuery: baseQueryWithAuth(tagURL),
  reducerPath: 'tagAPI',
  endpoints: (builder) => ({
    getAllTags: builder.mutation<BaseResponse<{ tags: ITags[] }>, void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllTagsMutation } = tagAPI;
