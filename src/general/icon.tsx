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
  } else if (props.iconName === 'bid') {
    req = require(`../navigation/assets/bid.png`);
  } else if (props.iconName === 'buy') {
    req = require(`../navigation/assets/buy.png`);
  } else if (props.iconName === 'delete') {
    req = require(`../navigation/assets/delete.png`);
  } else if (props.iconName === 'help') {
    req = require(`../navigation/assets/help.png`);
  } else if (props.iconName === 'info') {
    req = require(`../navigation/assets/info.png`);
  } else if (props.iconName === 'manage') {
    req = require(`../navigation/assets/manage.png`);
  } else if (props.iconName === 'rename') {
    req = require(`../navigation/assets/rename.png`);
  } else if (props.iconName === 'search') {
    req = require(`../navigation/assets/search.png`);
  } else if (props.iconName === 'sell') {
    req = require(`../navigation/assets/sell.png`);
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
