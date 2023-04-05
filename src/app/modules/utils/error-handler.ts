import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BaseResponse, { BaseErrorResponse } from 'app/domains/rtk/base.response';

const handleQueryError = (error: any) => {
  if (!error) return;
  if ('status' in error) {
    const queryError = error as FetchBaseQueryError;

    if (!queryError.data) console.error('Connection Error');
    else {
      const { message } = queryError.data as BaseErrorResponse;

      console.error(`${message || 'Error'}`);
    }
  } else {
    const { message } = error as BaseErrorResponse;

    console.error(`${message || 'Error'}`);
  }
};

const handleQueryMessage = ({ message }: BaseResponse<any>) => {
  console.log(`${message || 'Success'}`);
};

export { handleQueryError, handleQueryMessage };
