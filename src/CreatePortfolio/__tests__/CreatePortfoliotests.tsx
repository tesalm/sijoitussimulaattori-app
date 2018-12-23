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

  it('validating portfolio amount inputs', () => {
    const component = renderer.create(
      <CreatePortfolioTest
        {...defaultCreatePortfolioProps}
        {...navigationMock}
      />
    ).root;
    if (component != null) {
      //Text to portfolio amount
      component.instance.validateAmount('a');
      expect(component.instance.state.amountError).toEqual(true);
      expect(component.instance.state.amount).toEqual(NaN);
      //Whitespaces to portfolio amount
      component.instance.validateAmount('    10.00     ');
      expect(component.instance.state.amountError).toEqual(false);
      expect(component.instance.state.amount).toEqual(10.0);
      //end dot to portfolio amount
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
    if (component != null) {
      //Whitespaces to portfolio name
      component.instance.sanitize('    name     ');
      expect(component.instance.state.nameError).toEqual(false);
      expect(component.instance.state.name).toEqual('name');
      //lines to portfolio name
      component.instance.sanitize('--');
      expect(component.instance.state.nameError).toEqual(false);
      expect(component.instance.state.name).toEqual('--');
      //empty portfolio name
      component.instance.state.name = '';
      component.instance.sanitize('');
      expect(component.instance.state.nameError).toEqual(true);
      expect(component.instance.state.name).toEqual('');
    }
  });
});
