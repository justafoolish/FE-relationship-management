import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithAuth from '../base.auth';
import { animeDemoURL } from '../rtk.config';

interface IAnimeResponse {
  anime: string;
  character: string;
  quote: string;
}

export const animeAPI = createApi({
  baseQuery: baseQueryWithAuth(animeDemoURL),
  reducerPath: 'animeAPI',
  endpoints: (builder) => ({
    getRandomAnimeQuote: builder.query<Partial<IAnimeResponse>, void>({
      query: () => ({
        url: '/random',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetRandomAnimeQuoteQuery } = animeAPI;
