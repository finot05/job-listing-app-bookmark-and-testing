import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { jobsApi } from '../services/jobsApi';
import { bookmarkApi } from '../services/apiServices'; // ✅

export const store = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer,
    [bookmarkApi.reducerPath]: bookmarkApi.reducer, // ✅ important
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(jobsApi.middleware)
      .concat(bookmarkApi.middleware), // ✅ important
});

setupListeners(store.dispatch);
