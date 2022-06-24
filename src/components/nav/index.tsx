import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './nav.scss';
import Region from '../../types/Region';
import { actions } from '../../store/countrySlice';
import Mode from '../../types/Mode';
import { RootState } from '../../store';

function Nav() {
  const [selectedRegion, setSelectedRegion] = useState<string>('Select a region');
  const regions: Region[] = (Object.keys(Region) as Region[]);
  const dispatch = useDispatch();
  const theme: Mode = useSelector(
    (state: RootState) => state.theme.mode,
  );
  const handleClick = (event: any) => {
    setSelectedRegion(event.target.value);
    dispatch(actions.changeFilter(event.target.value));
  };
  const handleGlobalSearch = (event: any) => {
    dispatch(actions.findingByName(event.target.value));
  };
  return (
    <nav className="navigation">
      <input className={`nav-search nav-search-${theme}`} type="search" placeholder="Search for a country..." onChange={handleGlobalSearch} />
      <select className={`nav-filter nav-filter-${theme}`} value={selectedRegion} onChange={handleClick}>
        <option className="nav-filter-element" value="all">All regions</option>
        { regions.map(
          (region) => <option className="nav-filter-element" value={region} key={region}>{region}</option>,
        ) }
      </select>
    </nav>
  );
}

export default Nav;
