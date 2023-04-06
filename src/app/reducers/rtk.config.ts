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

// Demo only
const employeeDemoURL = 'https://dummy.restapiexample.com/api/v1/';
const animeDemoURL = 'https://animechan.vercel.app/api/';

// Main section

const BASE_ENDPOINT = 'http://localhost:9000/api';

const accountURL = BASE_ENDPOINT + '/account/';

export { employeeDemoURL, animeDemoURL };

export { accountURL };
export { baseQuery, prepareHeaders };
