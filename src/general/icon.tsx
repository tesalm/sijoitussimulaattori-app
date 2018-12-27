import React from 'react';
import { Image } from 'react-native';
import { scale } from '../util/scale';
import { Colors } from '../App/colors';

interface IconProps {
  iconName: string;
  iconHeight: number;
  iconWidth: number;
  tintColor?: string;
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
      source={req}
      style={{
        height: scale(props.iconHeight),
        width: scale(props.iconWidth),
        tintColor: props.tintColor,
      }}
    />
  );
};

export default Icon;
