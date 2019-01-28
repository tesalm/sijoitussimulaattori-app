import { shallow } from 'enzyme';
import * as React from 'react';
import configureStore from 'redux-mock-store';

import { Basicinfo, BasicinfoProps } from '../components/Basicinfo';

describe('basicinfo tests', () => {
  // Mock for navigation.
  const navigationMock: any = {};
  const middlewares: any = [];
  const mockStore = configureStore(middlewares);

  const defaultBasicinfoProps: BasicinfoProps = {
    stockMetadata: undefined,
    intradayQuote: undefined,
    metaLoading: false,
    intraLoading: false,
    metaError: undefined,
    intraError: undefined,
    revenue: 0,
  };

  const errorBasicinfoProps: BasicinfoProps = {
    stockMetadata: undefined,
    intradayQuote: undefined,
    metaLoading: false,
    intraLoading: false,
    metaError: { name: 'Metadata error', message: 'Stock metadata not found' },
    intraError: undefined,
    revenue: 0,
  };

  const successBasicinfoProps: BasicinfoProps = {
    stockMetadata: {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      type: 'string',
      region: 'string',
      marketOpen: '2018-12-12 11:20:00',
      marketClose: '2018-12-12 11:20:00',
      timeZone: 'US/Eastern',
      currency: 'USD',
      fetchTime: new Date(),
    },
    intradayQuote: {
      symbol: 'AAPL',
      date: '2018-12-12T00:20:00.000Z',
      open: 170.4,
      high: 170.43,
      low: 165.43,
      close: 168.63,
      volume: 12279994,
    },
    fetchTime: new Date(),
    metaLoading: false,
    intraLoading: false,
    metaError: undefined,
    intraError: undefined,
    revenue: 0,
  };

  it('Basicinfo renders correctly', async () => {
    const wrapper = shallow(
      <Basicinfo {...defaultBasicinfoProps} {...navigationMock} />,
      { context: { store: mockStore() } }
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('Basicinfo renders correctly with error', async () => {
    const wrapper = shallow(
      <Basicinfo {...errorBasicinfoProps} {...navigationMock} />,
      { context: { store: mockStore() } }
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('Basicinfo renders correctly with stock', async () => {
    const wrapper = shallow(
      <Basicinfo {...successBasicinfoProps} {...navigationMock} />,
      { context: { store: mockStore() } }
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
