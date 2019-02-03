import { createStackNavigator } from 'react-navigation';
import { Colors } from '../App/colors';
import { BidScreen } from '../Bid/BidScreen';
import StockScreen from '../Stock/StockScreen';
import { SumUpScreen } from '../SumUp/SumUpScreen';
import { Styles } from './styles';

const StockModalNavigator = createStackNavigator(
  {
    StockModal: {
      screen: StockScreen,
      navigationOptions: () => ({
        headerBackTitleVisible: true,
      }),
    },
    // Bid: {
    //   screen: BidScreen,
    //   navigationOptions: () => ({
    //     headerBackTitleVisible: true,
    //   }),
    // },
    // SumUp: {
    //   screen: SumUpScreen,
    //   navigationOptions: () => ({
    //     headerBackTitleVisible: true,
    //   }),
    // },
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
