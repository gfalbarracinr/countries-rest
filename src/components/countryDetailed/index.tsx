import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import CountryDetailed from '../../types/CountryDetailed';
import Mode from '../../types/Mode';
import Error from '../error';
import Header from '../header';
import './countrydetailed.scss';

function CountryDetail() {
  const loc = useLocation();
  const navigate = useNavigate();
  const [info, setInfo] = useState<CountryDetailed | null>(null);
  const [error, setError] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>(loc.pathname.slice(1));
  const getLanguages = (lang: Array<any>): Array<string> => lang.map((language) => language.name);
  const getCurrencies = (
    currencies: Array<any>,
  ): Array<string> => currencies.map((curr: any) => curr.name);
  // eslint-disable-next-line no-unused-vars
  const theme: Mode = useSelector(
    (state: RootState) => state.theme.mode,
  );

  const parser = (country: any) => {
    const countryInfo: CountryDetailed = {
      name: country.name,
      population: country.population,
      region: country.region,
      capital: country.capital || '',
      flag: country.flags.png,
      code: country.altSpellings[0],
      nativeName: country.nativeName,
      subregion: country.subregion,
      topLevelDomain: country.topLevelDomain ? country.topLevelDomain[0] : '',
      currencies: getCurrencies(country.currencies),
      languages: getLanguages(country.languages),
      borderCountries: country.borders,
    };
    return countryInfo;
  };
  useEffect(() => {
    fetch(`https://restcountries.com/v2/alpha?codes=${countryCode}`)
      .then((response) => response.json())
      .then((data) => {
        setInfo(parser(data[0]));
        setError('');
      })
      .catch((e) => setError(e.message));
  }, [countryCode]);
  const handleClick = (borderCode: string) => {
    navigate(`/${borderCode}`, { replace: true });
    setCountryCode(borderCode);
  };
  return (
    <section className={`country-detailed-${theme} country-detailed-container`}>
      <Header />
      <button className={`country-button country-button-${theme}`} type="button" onClick={() => navigate('/', { replace: true })}>back</button>
      {error !== '' && <Error message={error} />}
      {info === null && error === '' && <Error message="the country was not found" />}
      {info !== null && error === ''
        && (
        <main className="country-desc-container">
          <img className="country-info-flag" src={info.flag} alt={`${info.name}'s flag`} height="200px" width="320px" />
          <h1 className="country-title">{info.name}</h1>
          <ul className="country-info-container">
            <li className="country-info-text">
              <h2>Native name: </h2>
              <p>{info.nativeName}</p>
            </li>
            <li className="country-info-text">
              <h2>Population: </h2>
              <p>{info.population.toLocaleString()}</p>
            </li>
            <li className="country-info-text">
              <h2>Region: </h2>
              <p>{info.region}</p>
            </li>
            <li className="country-info-text">
              <h2>Sub Region: </h2>
              <p>{info.subregion}</p>
            </li>
            <li className="country-info-text">
              <h2>Capital: </h2>
              <p>{info.capital}</p>
            </li>
            <li className="country-info-text">
              <h2>Top Level Domain: </h2>
              <p>{info.topLevelDomain}</p>
            </li>
            <li className="country-info-text">
              <h2>Currencies: </h2>
              <p>{info.currencies.join(',')}</p>
            </li>
            <li className="country-info-text">
              <h2>Languages: </h2>
              <p>{info.languages.join(',')}</p>
            </li>
          </ul>
          <ul className="country-borders">
            <h2>Border countries: </h2>
            { info.borderCountries && info.borderCountries.map((border) => (
              <li key={border}>
                <button type="button" className={`border-button country-button-${theme}`} onClick={() => handleClick(border)}>{border}</button>
              </li>
            ))}
          </ul>
        </main>
        )}
    </section>
  );
}

export default CountryDetail;
