import React from 'react';
import { Image, ColorPropType } from 'react-native';
import { Colors } from '../App/colors';

interface IconProps {
  iconName: string;
  iconHeight: number;
  iconWidth: number;
}

const Icon = (props: IconProps): JSX.Element => {
  let req;
  if (props.iconName === 'open') {
    req = require(`../navigation/assets/open.png`);
  } else if (props.iconName === 'transaction') {
    req = require(`../navigation/assets/transaction.png`);
  }
  return (
    <Image
      // TODO: Make this work:
      source={req}
      style={{
        height: props.iconHeight,
        width: props.iconWidth,
      }}
    />
  );
};

export default Icon;
