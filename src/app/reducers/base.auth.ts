import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { BaseErrorResponse } from 'app/domains/rtk/base.response';
import { baseQuery } from './rtk.config';

const baseQueryWithAuth =
  (baseUrl?: string): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
  async (args, api, extraOptions) => {
    const result = await baseQuery(baseUrl)(args, api, extraOptions);
    if ((result?.error?.data as unknown as BaseErrorResponse)?.code === 'UNAUTHORIZED') {
      // handle log out
    }

    return result;
  };

export default baseQueryWithAuth;
