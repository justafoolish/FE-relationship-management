import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { RootState } from '.';

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

const prepareHeaders = (headers: Headers, { getState }: any) => {
  const token = (getState() as RootState).auth.accessToken;

  if (token) headers.set('authorization', `Bearer ${token}`);

  return headers;
};

export const customQuery =
  <T>(url: string, method: HTTP_METHOD) =>
  (body?: T, param?: T) => ({
    url,
    body,
    method,
    param,
  });

const baseQuery = (baseUrl?: string) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  });

const BASE_ENDPOINT = 'http://157.245.196.95/api';

const accountURL = BASE_ENDPOINT + '/account/';

const relationshipURL = BASE_ENDPOINT + '/relationship/';

const appointmentURL = BASE_ENDPOINT + '/appointment';

const notificationURL = BASE_ENDPOINT + '/notification';

const tagURL = BASE_ENDPOINT + '/tags';

export { accountURL, relationshipURL, appointmentURL, notificationURL, tagURL };
export { baseQuery, prepareHeaders };
