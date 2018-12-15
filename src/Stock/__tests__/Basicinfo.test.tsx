import * as React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { BasicinfoProps, Basicinfo } from '../components/Basicinfo';

describe('basicinfo tests', () => {
  // Mock for navigation.
  const navigationMock: any = {};
  const middlewares: any = [];
  const mockStore = configureStore(middlewares);

  const defaultBasicinfoProps: BasicinfoProps = {
    metadata: undefined,
    intraday: undefined,
    metaLoading: false,
    intraLoading: false,
    metaError: undefined,
    intraError: undefined,
    revenue: '',
  };

  const errorBasicinfoProps: BasicinfoProps = {
    metadata: undefined,
    intraday: undefined,
    metaLoading: false,
    intraLoading: false,
    metaError: { name: 'Metadata error', message: 'Metadata not found' },
    intraError: undefined,
    revenue: '',
  };

  const successBasicinfoProps: BasicinfoProps = {
    metadata: {
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
    intraday: {
      symbol: 'AAPL',
      date: '2018-12-12',
      open: 170.4,
      high: 170.43,
      low: 165.43,
      close: 168.63,
      volume: 12279994,
      fetchTime: new Date(),
    },
    metaLoading: false,
    intraLoading: false,
    metaError: undefined,
    intraError: undefined,
    revenue: '',
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
