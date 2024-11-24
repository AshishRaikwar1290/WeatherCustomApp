import { configureStore } from '@reduxjs/toolkit'; 
import { weatherApiSlice } from './weatherApiSlice';
import { weatherDataSlice } from './weatherData';
import { createWrapper } from 'next-redux-wrapper';

// Configure the store with the API slice reducer
export const store = configureStore({
  reducer: {
    [weatherApiSlice.reducerPath]: weatherApiSlice.reducer,
    weatherDataSlice: weatherDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApiSlice.middleware), 
});

export const wrapper = createWrapper(() => store);
