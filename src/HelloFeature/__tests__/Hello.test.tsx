import { mount } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { HelloProps, HelloTest } from '../Hello';

describe('Hello World', () => {
  const defaultHelloProps: HelloProps = {
    counterValue: 0,
    onIncrement: jest.fn(),
    onDecrement: jest.fn(),
  };

  it('renders correctly', async () => {
    const component = renderer
      .create(<HelloTest {...defaultHelloProps} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('has property name correctly set', async () => {
    const wrapper = mount(<HelloTest name="John" {...defaultHelloProps} />);
    expect(wrapper.prop('name')).toEqual('John');
  });
});
