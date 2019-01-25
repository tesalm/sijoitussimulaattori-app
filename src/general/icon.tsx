import React from 'react';
import { Image } from 'react-native';

import { Colors } from '../App/colors';
import { scale } from '../util/scale';

interface IconProps {
  iconName: string;
  iconHeight: number;
  iconWidth: number;
}

export enum IconNames {
  open = 'open',
  transaction = 'transaction',
  holdings = 'holdings',
  manage = 'manage',
  eventsTransactions = 'eventsTransactions',
  bid = 'bid',
  add = 'add',
  arrowDown = 'arrowDown',
  arrowUp = 'arrowUp',
  twoArrowOpen = 'twoArrowOpen',
  twoArrowClose = 'twoArrowClose',
  events = 'events',
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
    case IconNames.arrowDown:
      req = require('../navigation/assets/arrowDown.png');
      break;
    case IconNames.arrowUp:
      req = require('../navigation/assets/arrowUp.png');
      break;
    case IconNames.arrowUp:
      req = require('../navigation/assets/arrowUp.png');
      break;
    case IconNames.twoArrowClose:
      req = require('../navigation/assets/twoArrowClose.png');
      break;
    case IconNames.twoArrowOpen:
      req = require('../navigation/assets/twoArrowOpen.png');
      break;
    case IconNames.events:
      req = require('../navigation/assets/events.png');
      break;
    case IconNames.add:
      req = require('../navigation/assets/add.png');
      break;
    default:
      //TODO: Add better icon for default case.
      req = require('../navigation/assets/delete.png');
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
