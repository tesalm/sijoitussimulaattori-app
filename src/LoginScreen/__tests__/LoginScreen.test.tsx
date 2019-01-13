import * as React from 'react';
import renderer from 'react-test-renderer';

import { LoginState } from '../../Auth/reducer';
import { LoginScreenTest, LoginViewProps } from '../LoginScreen';

describe('Testing Login Screen', () => {
  // Mock for navigation.
  const navigationMock: any = {};

  const defaultLoginViewProps: LoginViewProps = {
    loginState: LoginState.LoggedOut,
    loginError: undefined,
    onLoginAsAnonym: jest.fn(),
  };

  const afterLoginErrorProps: LoginViewProps = {
    loginState: LoginState.LoggedOut,
    loginError: Error('fake-failure occurred'),
    onLoginAsAnonym: jest.fn(),
  };

  const duringLoggingInProps: LoginViewProps = {
    loginState: LoginState.LoggingIn,
    loginError: undefined,
    onLoginAsAnonym: jest.fn(),
  };

  it('renders correctly', async () => {
    const component = renderer
      .create(
        <LoginScreenTest {...defaultLoginViewProps} {...navigationMock} />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly after login error', async () => {
    const component = renderer
      .create(<LoginScreenTest {...afterLoginErrorProps} {...navigationMock} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly when logging in and waiting', async () => {
    const component = renderer
      .create(<LoginScreenTest {...duringLoggingInProps} {...navigationMock} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
