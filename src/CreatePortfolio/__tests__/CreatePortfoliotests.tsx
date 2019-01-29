import * as React from 'react';
import renderer from 'react-test-renderer';

import { CreatePortfolioProps, CreatePortfolioTest } from '../CreatePortfolio';

describe('Create Portfolio', () => {
  // Mock for navigation.
  const navigationMock: any = {};

  const defaultCreatePortfolioProps: CreatePortfolioProps = {
    createPortfolioLoading: false,
    createPortfolioError: undefined,
    createNewPortfolio: jest.fn(),
    createPortfolioSuccess: false,
  };

  const loadingCreatePortfolioProps: CreatePortfolioProps = {
    createPortfolioLoading: true,
    createPortfolioError: undefined,
    createNewPortfolio: jest.fn(),
    createPortfolioSuccess: false,
  };

  const errorCreatePortfolioProps: CreatePortfolioProps = {
    createPortfolioLoading: false,
    createPortfolioError: {
      name: 'Network Error',
      message: 'Network connection failed',
    },
    createNewPortfolio: jest.fn(),
    createPortfolioSuccess: false,
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

  it('validating portfolio amount inputs', () => {
    const component = renderer.create(
      <CreatePortfolioTest
        {...defaultCreatePortfolioProps}
        {...navigationMock}
      />
    ).root;
    if (component !== null) {
      // Text to portfolio amount
      component.instance.validateAmount('a');
      expect(component.instance.state.amountError).toEqual(true);
      expect(component.instance.state.amount).toEqual(NaN);
      // Whitespaces to portfolio amount
      component.instance.validateAmount('    10.00     ');
      expect(component.instance.state.amountError).toEqual(false);
      expect(component.instance.state.amount).toEqual(10.0);
      // end dot to portfolio amount
      component.instance.validateAmount('10.');
      expect(component.instance.state.amountError).toEqual(false);
      expect(component.instance.state.amount).toEqual(10.0);
    }
  });

  it('validating portfolio name inputs', () => {
    const component = renderer.create(
      <CreatePortfolioTest
        {...defaultCreatePortfolioProps}
        {...navigationMock}
      />
    ).root;
    if (component !== null) {
      // Whitespaces to portfolio name
      component.instance.sanitizePortfolioName('    name     ');
      expect(component.instance.state.nameError).toEqual(false);
      expect(component.instance.state.name).toEqual('name');
      // lines to portfolio name
      component.instance.sanitizePortfolioName('--');
      expect(component.instance.state.nameError).toEqual(false);
      expect(component.instance.state.name).toEqual('--');
      // empty portfolio name
      component.instance.state.name = '';
      component.instance.sanitizePortfolioName('');
      expect(component.instance.state.nameError).toEqual(true);
      expect(component.instance.state.name).toEqual('');
    }
  });
  it('renders correctly with loading', async () => {
    const component = renderer
      .create(
        <CreatePortfolioTest
          {...loadingCreatePortfolioProps}
          {...navigationMock}
        />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
  it('renders correctly with error', async () => {
    const component = renderer
      .create(
        <CreatePortfolioTest
          {...errorCreatePortfolioProps}
          {...navigationMock}
        />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
