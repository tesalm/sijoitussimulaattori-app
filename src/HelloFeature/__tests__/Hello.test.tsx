import * as React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { Hello, HelloProps } from '../Hello';

describe('Hello World', () => {
  const defaultHelloProps: HelloProps = {
    counterValue: 0,
    onIncrement: jest.fn(),
    onDecrement: jest.fn(),
  };

  it('renders correctly', async () => {
    const component = renderer
      .create(<Hello {...defaultHelloProps} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('has property name correctly set', async () => {
    const wrapper = mount(<Hello name="John" {...defaultHelloProps} />);
    expect(wrapper.prop('name')).toEqual('John');
  });
});
