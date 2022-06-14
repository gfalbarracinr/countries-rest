import React from 'react';
import Country from '../../types/Country';
import './country.scss';

function CountryInfo({
  name, capital, population, region, flag,
}: Country) {
  return (
    <article className="country">
      <img className="country-flag" src={flag} alt={`${name}'s flag`} height="150px" width="250px" />
      <section className="country-info">
        <h1 className="country-title">{name}</h1>
        <div>
          <h2 className="country-subtitle">Population:</h2>
          <p className="country-text">{` ${population.toLocaleString()}`}</p>
        </div>
        <div>
          <h2 className="country-subtitle">Region:</h2>
          <p className="country-text">{` ${region}`}</p>
        </div>
        <div>
          <h2 className="country-subtitle">Capital:</h2>
          <p className="country-text">{` ${capital}`}</p>
        </div>
      </section>
    </article>
  );
}
export default CountryInfo;
