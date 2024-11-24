import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from '../constants'; // Import from constants


export const weatherApiSlice = createApi({
  reducerPath: 'weatherApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: WEATHER_API_BASE_URL, 
  }),
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: ({city , reportType}) => `/${reportType==="current"?`current`:`current`}?access_key=${encodeURIComponent(WEATHER_API_KEY)}&query=${city}`, 
    }),
  }),
});

export const { useGetWeatherQuery, getWeather } = weatherApiSlice;
