import * as React from 'react';
import renderer from 'react-test-renderer';

import { mount } from 'enzyme';

import Hello from '../Hello';

describe('Hello World', () => {
  it('renders correctly', async () => {
    const component = renderer.create(<Hello />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('has property name correctly set', async () => {
    const wrapper = mount(<Hello name="John" />);
    expect(wrapper.prop('name')).toEqual('John');
  });
});
