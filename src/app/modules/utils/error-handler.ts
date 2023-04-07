import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { BaseErrorResponse } from 'app/domains/rtk/base.response';
import { toast } from 'react-hot-toast';

const handleQueryError = (error: any) => {
  if (!error) return;

  const queryError = error as FetchBaseQueryError;
  if (!queryError.data) toast.error('Connection Error');
  else {
    const { message } = queryError.data as BaseErrorResponse;

    if (!message) return;

    if (typeof message === 'string') {
      toast.error(`${message || 'Error'}`);
    } else {
      const firstErrorMessage = message[Object.keys(message)?.[0]]?.[0];

      toast.error(`${firstErrorMessage || 'Error'}`);
    }
  }
};

export { handleQueryError };
