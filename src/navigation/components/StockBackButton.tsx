import React from 'react';
import {
  HeaderBackButton,
  NavigationScreenProp,
  NavigationState,
  withNavigation,
} from 'react-navigation';
import { Colors } from '../../App/colors';
import { RouteName } from '../routes';

export interface StockBackButtonProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface StockBackButtonState {}

export class StockBackButton extends React.Component<
  StockBackButtonProps,
  StockBackButtonState
> {
  navigateBack = () => {
    this.props.navigation.navigate(RouteName.StockList);
  };

  render() {
    return (
      <HeaderBackButton
        tintColor={Colors.headerIcons}
        onPress={this.navigateBack}
      />
    );
  }
}

const StockBackButtonWithNavigation = withNavigation(StockBackButton);

export default StockBackButtonWithNavigation;
