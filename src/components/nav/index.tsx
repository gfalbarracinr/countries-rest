import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './nav.scss';
import Region from '../../types/Region';
import { actions } from '../../store/countrySlice';

function Nav() {
  const [selectedRegion, setSelectedRegion] = useState<string>('Select a region');
  const regions: Region[] = (Object.keys(Region) as Region[]);
  const dispatch = useDispatch();
  const handleClick = (event: any) => {
    setSelectedRegion(event.target.value);
    dispatch(actions.changeFilter(event.target.value));
  };
  const handleGlobalSearch = (event: any) => {
    dispatch(actions.findingByName(event.target.value));
  };
  return (
    <nav className="navigation">
      <input className="nav-search" type="search" placeholder="Search for a country..." onChange={handleGlobalSearch} />
      <select className="nav-filter" value={selectedRegion} onChange={handleClick}>
        <option value="all">All regions</option>
        { regions.map(
          (region) => <option value={region} key={region}>{region}</option>,
        ) }
      </select>
    </nav>
  );
}

export default Nav;
