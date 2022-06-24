import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import store from './store';
import CountryDetailed from './components/countryDetailed';

const element: HTMLElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(element);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path=":countryName" element={<CountryDetailed />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
