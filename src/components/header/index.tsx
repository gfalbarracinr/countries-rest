import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../store/themeSlice';
import './header.scss';

function Header() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(actions.toggleTheme());
  };
  return (
    <header className="header">
      <h1 className="header-title">Where in the world</h1>
      <button className="button" type="button" onClick={handleClick}>Dark mode</button>
    </header>
  );
}

export default Header;
