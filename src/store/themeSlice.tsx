/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import ThemeState from '../states/ThemeState';
import Mode from '../types/Mode';

const initialState: ThemeState = {
  mode: Mode.Light,
};
const themeSlice = createSlice({
  name: 'Theme',
  initialState,
  reducers: {
    toggleTheme(state: ThemeState) {
      if (state.mode === Mode.Light) {
        state.mode = Mode.Dark;
      } else {
        state.mode = Mode.Light;
      }
    },
  },

});

export const { actions } = themeSlice;

export default themeSlice;
