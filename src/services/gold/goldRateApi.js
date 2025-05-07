// src/services/gold/goldRateApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import goldRateService from './goldRateService';

/**
 * RTK Query API slice for gold rates
 */
export const goldRateApi = createApi({
  reducerPath: 'goldRateApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['GoldRate', 'CaratType'],
  endpoints: (builder) => ({
    // Get all gold rates with optional filters
    getGoldRates: builder.query({
      queryFn: async (filters = {}) => {
        try {
          const data = await goldRateService.getGoldRates(filters);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['GoldRate']
    }),
    
    // Get a single gold rate by ID
    getGoldRateById: builder.query({
      queryFn: async (id) => {
        try {
          const data = await goldRateService.getGoldRateById(id);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: (result, error, id) => [{ type: 'GoldRate', id }]
    }),
    
    // Get carat types for dropdown
    getCaratTypes: builder.query({
      queryFn: async () => {
        try {
          const data = await goldRateService.getCaratTypes();
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['CaratType']
    }),
    
    // Get gold rates for a specific date (for report)
    getGoldRateReportByDate: builder.query({
      queryFn: async ({ date, tenantId = 1 }) => {
        try {
          const data = await goldRateService.getGoldRateReportByDate(date, tenantId);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['GoldRate']
    }),
    
    // Get gold rate trends (for charts/analytics)
    getGoldRateTrends: builder.query({
      queryFn: async ({ caratId, days = 30 }) => {
        try {
          const data = await goldRateService.getGoldRateTrends(caratId, days);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['GoldRate']
    })
  })
});

// Export hooks for usage in functional components
export const {
  useGetGoldRatesQuery,
  useGetGoldRateByIdQuery,
  useGetCaratTypesQuery,
  useGetGoldRateReportByDateQuery,
  useGetGoldRateTrendsQuery
} = goldRateApi;