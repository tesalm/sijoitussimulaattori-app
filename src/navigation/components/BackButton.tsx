import React from 'react';
import {
  HeaderBackButton,
  NavigationScreenProp,
  NavigationState,
  withNavigation,
} from 'react-navigation';
import { Colors } from '../../App/colors';

export interface BackButtonProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface BackButtonState {}

export class BackButton extends React.Component<
  BackButtonProps,
  BackButtonState
> {
  navigateBack = () => {
    this.props.navigation.goBack();
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

const BackButtonWithNavigation = withNavigation(BackButton);

export default BackButtonWithNavigation;
