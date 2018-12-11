import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { NavigationActions, DrawerActions } from 'react-navigation';

import MainNavigator from '../MainNavigator';
import { RouteName } from '../routes';
import 'react-native';

describe('navigation', () => {
  const wrapper = shallow(<MainNavigator />);
  const navigator: any = wrapper.instance();
  
  it('routes', async () => {
    const routes = Object.keys(RouteName);
    routes.map((route) => {
      expect(
        navigator.dispatch(NavigationActions.navigate({ routeName: route }))
      ).toEqual(true);
    });
  });

  it('bottom tabs', async () => {
    expect(navigator.state.nav.routes[0].routes.length).toBe(4);

    navigator.dispatch(NavigationActions.navigate({routeName: RouteName.Home}));
    expect(navigator.state.nav.routes[0]).toMatchObject({ index: 0 });

    navigator.dispatch(NavigationActions.navigate({routeName: RouteName.Market}));
    expect(navigator.state.nav.routes[0]).toMatchObject({ index: 1 });

    navigator.dispatch(NavigationActions.navigate({routeName: RouteName.Commissions}));
    expect(navigator.state.nav.routes[0]).toMatchObject({ index: 2 });

    navigator.dispatch(NavigationActions.navigate({routeName: RouteName.Community}));
    expect(navigator.state.nav.routes[0]).toMatchObject({ index: 3 });

    navigator.dispatch(NavigationActions.back());
    expect(navigator.state.nav.routes[0]).toMatchObject({ index: 0 });
  });

  it('drawer toggle', async () => {
    navigator.dispatch(DrawerActions.toggleDrawer());
    expect(navigator.state.nav.toggleId).toBe(1);
  });
});