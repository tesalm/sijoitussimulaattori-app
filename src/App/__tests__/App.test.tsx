import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { initialAuthState, LoginState } from '../../Auth/reducer';
import { initialState as initialStockListingState } from '../../MarketScreen/reducer';
import { RootState } from '../../redux/reducers';
import { initialUserState } from '../../User/reducer';
import App from '../App';

jest.mock('react-native-vector-icons', () => {
  console.log('foooo');
  return null;
});
const mockStore = configureStore([thunk]);
const defaultState: RootState = {
  counter: { counterValue: 0 },
  login: initialAuthState,
  stocksListing: initialStockListingState,
  user: initialUserState,
};
const authenticatedState: RootState = {
  ...defaultState,
  login: {
    ...defaultState.login,
    loginState: LoginState.LoggedIn,
  },
  user: {
    ...defaultState.user,
    userData: {
      username: 'AhtoSimakuutio',
    },
  },
};

describe('App', () => {
  it('should display login screen for default store', () => {
    const wrapper = mount(
      <Provider store={mockStore(defaultState)}>
        <App />
      </Provider>
    );
    expect(
      wrapper
        .find('LoginScreen')
        .find('Text')
        .first()
        .text()
    ).toEqual('Your first time at ValueTown?');
    wrapper.unmount();
  });

  it('should display home screen when user is authenticated', () => {
    const wrapper = mount(
      <Provider store={mockStore(authenticatedState)}>
        <App />
      </Provider>
    );
    expect(
      wrapper
        .find('HomeScreen')
        .find('Text')
        .first()
        .text()
    ).toEqual('PLACEHOLDER: Listing of portfolios');
  });
});
