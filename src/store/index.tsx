import { configureStore } from '@reduxjs/toolkit';
import countrySlice from './countrySlice';
import themeSlice from './themeSlice';

const store = configureStore({
  reducer: {
    country: countrySlice.reducer,
    theme: themeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export default store;
