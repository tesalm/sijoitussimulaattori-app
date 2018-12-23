import * as React from 'react';
import renderer from 'react-test-renderer';

import { CreatePortfolioProps, CreatePortfolioTest } from '../CreatePortfolio';

describe('Create Portfolio', () => {
  //Mock for navigation.
  const navigationMock: any = {};

  const defaultCreatePortfolioProps: CreatePortfolioProps = {
    onCreatePortfolio: jest.fn(),
  };

  it('renders correctly', async () => {
    const component = renderer
      .create(
        <CreatePortfolioTest
          {...defaultCreatePortfolioProps}
          {...navigationMock}
        />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  //TODO: Testing text inputs
  it('input test #1', () => {
    const component = renderer
      .create(
        <CreatePortfolioTest
          {...defaultCreatePortfolioProps}
          {...navigationMock}
        />
      )
      .getInstance();
    const nameAndAmount = { name: '', amount: 10 };
  });
});
