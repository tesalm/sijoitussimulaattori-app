import React from 'react';
import {
  HeaderBackButton,
  NavigationScreenProp,
  NavigationState,
  withNavigation,
} from 'react-navigation';
import { Colors } from '../../App/colors';
import { RouteName } from '../routes';

export interface PortfolioBackButtonProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface PortfolioBackButtonState {}

export class PortfolioBackButton extends React.Component<
  PortfolioBackButtonProps,
  PortfolioBackButtonState
> {
  navigateBack = () => {
    this.props.navigation.navigate(RouteName.Home);
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

const PortfolioBackButtonWithNavigation = withNavigation(PortfolioBackButton);

export default PortfolioBackButtonWithNavigation;
