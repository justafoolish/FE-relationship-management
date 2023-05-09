import { createApi } from '@reduxjs/toolkit/query/react';
import BaseResponse from 'app/domains/rtk/base.response';
import baseQueryWithAuth from '../base.auth';
import { relationshipURL } from '../rtk.config';

interface ICreateRelationshipRequest {
  name: string;
  tag: string;
  date_meeting: string | number | Date;
  email: string;
  phone: string;
  notes: string;
  avatar: string;
}
export const relationshipAPI = createApi({
  baseQuery: baseQueryWithAuth(relationshipURL),
  reducerPath: 'relationshipAPI',
  endpoints: (builder) => ({
    createRelationship: builder.mutation<BaseResponse<any>, Partial<ICreateRelationshipRequest>>({
      query: (body) => ({
        url: '/create',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateRelationshipMutation } = relationshipAPI;
