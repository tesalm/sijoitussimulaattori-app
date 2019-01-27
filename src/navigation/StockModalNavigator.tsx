import { createStackNavigator } from 'react-navigation';

import StockScreen from '../Stock/StockScreen';

const StockModalNavigator = createStackNavigator(
  {
    StockModal: {
      screen: StockScreen,
      navigationOptions: () => ({
        headerBackTitleVisible: true,
      }),
    },
  },
  {
    mode: 'modal',
  }
);

export default StockModalNavigator;
