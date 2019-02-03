import { createStackNavigator } from 'react-navigation';
import { Colors } from '../App/colors';
import BidScreen from '../Bid/BidScreen';
import StockScreen from '../Stock/StockScreen';
import SumUpScreen from '../SumUp/SumUpScreen';
import { Styles } from './styles';

const StockModalNavigator = createStackNavigator(
  {
    Stock: {
      screen: StockScreen,
      navigationOptions: {
        headerBackTitle: 'StockList',
        headerMode: 'none',
      },
    },
    Bid: {
      screen: BidScreen,
    },
    SumUp: {
      screen: SumUpScreen,
    },
  },
  {
    mode: 'modal',
    navigationOptions: ({ navigation }) => ({
      headerStyle: Styles.header,
      headerTintColor: Colors.whiteBackground,
    }),
  }
);

export default StockModalNavigator;
