import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { actions } from '../../store/themeSlice';
import Mode from '../../types/Mode';
import './header.scss';

function Header() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(actions.toggleTheme());
  };
  const theme: Mode = useSelector(
    (state: RootState) => state.theme.mode,
  );
  return (
    <header className={`header header-${theme}`}>
      <h1 className="header-title">Where in the world</h1>
      <button className={`button button-${theme}`} type="button" onClick={handleClick}>Dark mode</button>
    </header>
  );
}

export default Header;
