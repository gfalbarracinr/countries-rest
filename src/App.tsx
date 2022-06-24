import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import Header from './components/header';
import Country from './types/Country';
import CountryInfo from './components/country';
import Nav from './components/nav';
import countryFilterType from './types/CountryFilterType';
import { RootState } from './store';
import Mode from './types/Mode';
import Loading from './components/loading';
import Error from './components/error';

function App() {
  const [countries, setCountries] = useState<Array<Country>>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentCountries, setCurrentCountries] = useState<Array<Country>>([]);
  const countryFilterByRegion: countryFilterType = useSelector(
    (state: RootState) => state.country.countryFilterByRegion,
  );
  const countryGlobalSearch: string = useSelector(
    (state: RootState) => state.country.countryGlobalSearch,
  );

  const theme: Mode = useSelector(
    (state: RootState) => state.theme.mode,
  );

  const filterCountries = (data: Array<any>) => data.map((
    country:any,
  ) => {
    const capital: string = country.capital ? country.capital[0] : '';
    const land: Country = {
      name: country.name.common,
      population: country.population,
      region: country.region,
      capital,
      flag: country.flags.png,
      code: country.altSpellings[0],
    };
    return land;
  });
  const fetchData = () => {
    setLoading(true);
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        const filteredCountries = filterCountries(data);
        setCountries(filteredCountries);
        setCurrentCountries(filteredCountries);
        setLoading(false);
        setError('');
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const filterCountry = (elements: Array<Country>) => {
    if (countryFilterByRegion === 'all') {
      return elements;
    }
    return elements.filter(
      (country) => country.region === countryFilterByRegion,
    );
  };

  useEffect(() => {
    const filteredByRegion = filterCountry(countries);
    if (countryGlobalSearch === '') {
      setCurrentCountries(filteredByRegion);
    }
    const filterByName = filteredByRegion.filter(
      (country) => country.name.toLowerCase().startsWith(countryGlobalSearch.toLowerCase()),
    );
    setCurrentCountries(filterByName);
  }, [countryFilterByRegion, countryGlobalSearch]);
  return (
    <div className={`container container-${theme.toString()}`}>
      <Header />
      <Nav />
      { loading && <Loading />}
      { error !== '' && !loading && <Error message={error} />}
      <main className="country-container">
        { error === '' && !loading && currentCountries.map((country: Country) => (
          <CountryInfo
            key={country.name}
            name={country.name}
            population={country.population}
            region={country.region}
            capital={country.capital}
            flag={country.flag}
            code={country.code}
          />
        )) }
      </main>
    </div>
  );
}

export default App;
