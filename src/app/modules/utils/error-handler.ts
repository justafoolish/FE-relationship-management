import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { BaseErrorResponse } from 'app/domains/rtk/base.response';
import { toast } from 'react-hot-toast';

const handleQueryError = (error: any) => {
  if (!error) return;
  if ('status' in error) {
    const queryError = error as FetchBaseQueryError;

    if (!queryError.data) toast.error('Connection Error');
    else {
      const { message } = queryError.data as BaseErrorResponse;

      toast.error(`${message || 'Error'}`);
    }
  } else {
    const { message } = error as BaseErrorResponse;

    toast.error(`${message || 'Error'}`);
  }
};

export { handleQueryError };
