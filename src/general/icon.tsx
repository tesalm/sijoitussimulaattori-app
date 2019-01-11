import React from 'react';
import { Image } from 'react-native';

import { Colors } from '../App/colors';
import { scale } from '../util/scale';

interface IconProps {
  iconName: string;
  iconHeight: number;
  iconWidth: number;
}

enum IconNames {
  open = 'open',
  transaction = 'transaction',
  holdings = 'holdings',
  manage = 'manage',
  eventsTransactions = 'eventsTransactions',
  bid = 'bid',
}
const Icon = (props: IconProps): JSX.Element => {
  let req;

  switch (props.iconName) {
    case IconNames.open:
      req = require(`../navigation/assets/open.png`);
      break;
    case IconNames.transaction:
      req = require(`../navigation/assets/transaction.png`);
      break;
    case IconNames.holdings:
      req = require('../navigation/assets/briefcase2.png');
      break;
    case IconNames.manage:
      req = require('../navigation/assets/manage.png');
      break;
    case IconNames.eventsTransactions:
      req = require('../navigation/assets/manage.png');
      break;
    case IconNames.bid:
      req = require('../navigation/assets/bid.png');
      break;
    default:
      req = require('../navigation/assets/open.png');
      break;
  }

  return (
    <Image
      source={req}
      style={{
        height: scale(props.iconHeight),
        width: scale(props.iconWidth),
        tintColor: Colors.baseColor,
      }}
    />
  );
};

export default Icon;
