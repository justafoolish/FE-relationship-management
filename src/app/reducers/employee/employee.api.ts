import { createApi } from '@reduxjs/toolkit/query/react';
import BaseResponse from 'app/domains/rtk/base.response';
import baseQueryWithAuth from '../base.auth';
import { employeeDemoURL } from '../rtk.config';

interface IEmployeeResponse {
  id: string | number;
  employee_name: number;
  employee_salary: number;
  employee_age: number;
  profile_image: string;
}

export const employeeAPI = createApi({
  baseQuery: baseQueryWithAuth(employeeDemoURL),
  reducerPath: 'employeeAPI',
  endpoints: (builder) => ({
    getEmployee: builder.mutation<BaseResponse<Partial<IEmployeeResponse>>, string>({
      query: (id) => ({
        url: `/employee/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetEmployeeMutation } = employeeAPI;
