interface IMessage {
  [x: string]: string[];
}

export default class BaseResponse<T> {
  data?: T;
  message?: string | IMessage;
  errors?: string;
  status?: boolean;

  constructor(Data?: { new (): T }, errors?: string, message?: string | IMessage, status?: boolean) {
    if (errors) {
      this.errors = errors;
    }
    if (message) {
      this.message = message;
    }
    if (Data) {
      this.data = new Data();
    }
    if (status) {
      this.status = status;
    }
  }
}

export interface BaseErrorResponse {
  message?: string | IMessage;
  code?: string;
}

export interface BaseQueryError {
  status?: number;
  data?: BaseErrorResponse;
}

export const LIMIT_RECORD_PAGINATION = 10;
