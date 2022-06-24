import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import Country from '../../types/Country';
import Mode from '../../types/Mode';
import './country.scss';

function CountryInfo({
  name, capital, population, region, flag, code,
}: Country) {
  const navigate = useNavigate();
  const theme: Mode = useSelector(
    (state: RootState) => state.theme.mode,
  );
  const handleClick = () => {
    navigate(`/${code}`, { replace: true });
  };
  const handleKeyPress = () => {
    navigate(`/${code}`, { replace: true });
  };
  return (
    <button type="button" className={`country country-${theme}`} onClick={handleClick} onKeyPress={handleKeyPress}>
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
    </button>
  );
}
export default CountryInfo;
