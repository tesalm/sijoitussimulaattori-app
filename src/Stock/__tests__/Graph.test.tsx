import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';

import { DiagramTest, GraphProps } from '../components/Diagram';
import Graph from '../components/Graph';

jest.useFakeTimers();

describe('stockpage graph tests', () => {
  const defaultGraphProps: GraphProps = {
    historyData: [],
    intraDay: [],
    historyError: undefined,
  };

  const historyGraphProps: GraphProps = {
    historyData: [
      {
        symbol: 'AMZN',
        date: '2019-01-04T00:00:00.000Z',
        open: 66.6,
        high: 66.6,
        low: 66.6,
        close: 107.53,
        volume: 66,
      },
      {
        symbol: 'AMZN',
        date: '2019-01-03T00:00:00.000Z',
        open: 66.6,
        high: 66.6,
        low: 66.6,
        close: 107.6799,
        volume: 66,
      },
      {
        symbol: 'AMZN',
        date: '2019-01-02T00:00:00.000Z',
        open: 66.6,
        high: 66.6,
        low: 66.6,
        close: 107.51,
        volume: 66,
      },
    ],
    intraDay: [
      {
        symbol: 'AMZN',
        date: '2019-01-05T16:00:00.000Z',
        open: 66.6,
        high: 66.6,
        low: 66.6,
        close: 107.53,
        volume: 66,
      },
      {
        symbol: 'AMZN',
        date: '2019-01-05T15:55:00.000Z',
        open: 66.6,
        high: 66.6,
        low: 66.6,
        close: 107.6799,
        volume: 66,
      },
      {
        symbol: 'AMZN',
        date: '2019-01-05T15:50:00.000Z',
        open: 66.6,
        high: 66.6,
        low: 66.6,
        close: 107.51,
        volume: 66,
      },
    ],
    historyError: undefined,
  };

  const errorGraphProps: GraphProps = {
    historyData: [],
    intraDay: [],
    historyError: {
      name: 'Network Error',
      message: 'Network connection failed',
    },
  };

  it('renders loading', async () => {
    const component = shallow(<DiagramTest {...defaultGraphProps} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with no data', async () => {
    const component = shallow(<DiagramTest {...defaultGraphProps} />);
    jest.runAllTimers(); // Exhaust all tasks queued by setTimeout()
    component.update(); // Force re-render of the component
    expect(component.find(Graph).render()).toMatchSnapshot();
  });

  it('renders correctly with error', async () => {
    const component = renderer
      .create(<DiagramTest {...errorGraphProps} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with intradata', async () => {
    const component = shallow(<DiagramTest {...historyGraphProps} />);
    jest.runAllTimers();
    component.update();
    expect(component.state()).toMatchSnapshot();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with historydata', async () => {
    const wrapper = mount(<DiagramTest {...historyGraphProps} />);

    jest.runAllTimers();
    wrapper.update();

    wrapper
      .find('ButtonGroup')
      .find(TouchableOpacity)
      .at(4)
      .props().onPress!({} as any);

    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.state()).toMatchSnapshot();
    expect(
      wrapper
        .find(Graph)
        .find('VictoryArea')
        .prop('data')
    ).toMatchSnapshot();
  });
});
