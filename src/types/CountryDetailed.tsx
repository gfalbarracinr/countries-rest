import Country from './Country';

interface CountryDetailed extends Country {
  nativeName: string
  subregion: string
  topLevelDomain: string
  currencies: Array<string>
  languages: Array<string>
  borderCountries: Array<string>
}

export default CountryDetailed;
