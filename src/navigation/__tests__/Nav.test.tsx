import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { NavigationActions } from 'react-navigation';

import MenuIcon from '../components/MenuIcon';
import MainNavigator from '../MainNavigator';
import { RouteName } from '../routes';

import 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

describe('navigation', () => {
  const wrapper = mount(<MainNavigator />);
  const navigator: any = wrapper.instance();

  it('bottom tabs', async () => {
    expect(navigator.state.nav.routes[0].routes.length).toBe(4);

    wrapper
      .find('[testID="Home"]')
      .find(TouchableWithoutFeedback)
      .props().onPress!({} as any);

    expect(navigator.state.nav.routes[0]).toMatchObject({ index: 0 });

    wrapper
      .find('[testID="Market"]')
      .find(TouchableWithoutFeedback)
      .props().onPress!({} as any);

    expect(navigator.state.nav.routes[0]).toMatchObject({ index: 1 });

    wrapper
      .find('[testID="Commissions"]')
      .find(TouchableWithoutFeedback)
      .props().onPress!({} as any);

    expect(navigator.state.nav.routes[0]).toMatchObject({ index: 2 });

    wrapper
      .find('[testID="Community"]')
      .find(TouchableWithoutFeedback)
      .props().onPress!({} as any);

    expect(navigator.state.nav.routes[0]).toMatchObject({ index: 3 });

    navigator.dispatch(NavigationActions.back());
    expect(navigator.state.nav.routes[0]).toMatchObject({ index: 0 });
  });

  it('drawer toggle', async () => {
    const menu = wrapper
      .find(MenuIcon)
      .find(TouchableOpacity)
      .props();
    //expect(menu).toMatchSnapshot();
    menu.onPress!({} as any);
    expect(navigator.state.nav.toggleId).toBe(1);
  });
});

