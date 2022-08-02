/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import App from './App';
import store from './store';

describe('App component tests', () => {
  test('App snapshot test', () => {
    const components = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    const tree = components.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div,
    );
  });
});
