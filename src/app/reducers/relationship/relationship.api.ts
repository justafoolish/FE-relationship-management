import { createApi } from '@reduxjs/toolkit/query/react';
import BaseResponse, { PaginationResponse } from 'app/domains/rtk/base.response';
import baseQueryWithAuth from '../base.auth';
import { PaginationRequest } from 'app/domains/rtk/base.request';
import { relationshipURL } from '../rtk.config';
import { ICreateRelationshipRequest, IPeople } from 'app/domains/relationship/relationship.i';

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
    getAllRelationship: builder.query<BaseResponse<PaginationResponse<Partial<IPeople>>>, PaginationRequest>({
      query: (params) => ({
        url: '/',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const { useCreateRelationshipMutation, useGetAllRelationshipQuery } = relationshipAPI;
