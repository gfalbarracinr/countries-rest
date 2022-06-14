import countryFilterType from '../types/CountryFilterType';

interface CountryState {
    countryFilterByRegion: countryFilterType,
    countryGlobalSearch: string
}

export default CountryState;
