import { shallow } from 'enzyme';
import * as React from 'react';
import {
  DrawerActions,
  NavigationActions,
  StackActions,
} from 'react-navigation';

import { createMainSwitchNavigator } from '../AppNavigator';
import { RouteName } from '../routes';

import 'react-native';

const getCurrentRoute = (state: any): string =>
  state.index !== undefined
    ? getCurrentRoute(state.routes && state.routes[state.index])
    : state.routeName;

describe('Main navigation', () => {
  const wrapper = shallow(
    React.createElement(createMainSwitchNavigator(false))
  );
  const navigator: any = wrapper.instance();

  it('should navigate to all routes', async () => {
    const routes = Object.keys(RouteName);
    routes.forEach((route) => {
      expect(
        navigator.dispatch(NavigationActions.navigate({ routeName: route }))
      ).toEqual(true);
    });
  });

  it('should open and close the drawer toggle', async () => {
    navigator.dispatch(DrawerActions.toggleDrawer());

    expect(
      navigator.state.nav.routes
        .find((o: any) => o.routeName === RouteName.App)
        .routes.find((o: any) => o.routeName === RouteName.App).toggleId
    ).toBe(1);
  });

  it('should create a stack', () => {
    navigator.dispatch(
      NavigationActions.navigate({
        routeName: RouteName.Stock,
      })
    );

    expect(getCurrentRoute(navigator.state.nav)).toEqual(RouteName.Stock);
    navigator.dispatch(StackActions.pop({}));
    expect(getCurrentRoute(navigator.state.nav)).toEqual(RouteName.Profile);
  });
});
