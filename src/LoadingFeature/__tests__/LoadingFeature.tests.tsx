import * as React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import LoadingView from '../components/Loading';
import { LoadingProps } from '../Loading';

describe('sumUp tests', () => {
  const navigationMock: any = {};
  const middlewares: any = [];
  const mockStore = configureStore(middlewares);

  const loadingProps: LoadingProps = {
    user: undefined,
    loginRequest: jest.fn(),
  };

  it('Loading renders correctly', async () => {
    const component = renderer
      .create(<LoadingView {...loadingProps} {...navigationMock} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
