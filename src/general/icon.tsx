import React from 'react';
import { Image } from 'react-native';

interface IconProps {
  iconName: string;
  iconHeight: number;
  iconWidth: number;
}

const Icon = (props: IconProps): JSX.Element => {
  console.log('PROPSI' + props.iconName);
  return (
    <Image
      //source={{ uri: `${props.iconName}` }}
      source={require('../navigation/assets/close.png')}
      style={{ height: props.iconHeight, width: props.iconWidth }}
    />
  );
};

export default Icon;
