export default class BaseResponse<T> {
  data?: T;
  message?: Record<string, string[]>;
  code?: string;

  constructor(Data?: { new (): T }, code?: string, message?: Record<string, string[]>) {
    if (code) {
      this.code = code;
    }
    if (message) {
      this.message = message;
    }
    if (Data) {
      this.data = new Data();
    }
  }
}

export interface BaseErrorResponse {
  message?: Record<string, string[]> | string;
  code?: string;
}

export interface BaseQueryError {
  status?: number;
  data?: BaseErrorResponse;
}

export const LIMIT_RECORD_PAGINATION = 10;
