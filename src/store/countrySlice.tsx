/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import Action from '../states/Action';
import CountryState from '../states/CountryState';
import countryFilterType from '../types/CountryFilterType';

const initialState: CountryState = {
  countryFilterByRegion: 'all',
  countryGlobalSearch: '',
};
const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    changeFilter(state: CountryState, action: Action<countryFilterType>) {
      state.countryFilterByRegion = action.payload;
    },

    findingByName(state: CountryState, action: Action<string>) {
      state.countryGlobalSearch = action.payload;
    },
  },
});

export const { actions } = countrySlice;
export default countrySlice;
