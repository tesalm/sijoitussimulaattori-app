import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { buttonStyles, buttonStylesLight } from './styles';

export interface ButtonProps {
  buttonText: string;
  onPress: () => void;
  lightBackground?: boolean;
}

export class Button extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    const { onPress, buttonText, lightBackground } = this.props;

    const styleSheet =
      lightBackground && lightBackground === true
        ? buttonStylesLight
        : buttonStyles;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styleSheet.button}>
          <Text style={styleSheet.buttonText}>{buttonText.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
