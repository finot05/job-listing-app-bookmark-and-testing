import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Job } from '../types/types';

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://akil-backend.onrender.com/' }),
  endpoints: (builder) => ({
    getJobs: builder.query<{ data: Job[] }, void>({
      query: () => 'opportunities/search',
    }),
    getJobById: builder.query<{ data: Job }, string>({
      query: (id) => `opportunities/${id}`,
    }),
    
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
} = jobsApi;
