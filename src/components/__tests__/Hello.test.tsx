import * as React from 'react';
import renderer from 'react-test-renderer';

import Hello from '../Hello';

describe('Hello World', () => {
  it('renders correctly', async () => {
    const component = renderer.create(<Hello />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with name', async () => {
    const component = renderer.create(<Hello name="John" />);
    expect(component).toMatchSnapshot();
  });
});
