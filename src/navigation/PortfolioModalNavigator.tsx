import { createStackNavigator } from 'react-navigation';
import { Colors } from '../App/colors';
import TransactionsScreen from '../EventsAndTransactionsScreen/TransactionsScreen';
import PortfolioScreen from '../PortfolioScreen/PortfolioScreen';
import { Styles } from './styles';

const PortfolioModalNavigator = createStackNavigator(
  {
    SinglePortfolio: {
      screen: PortfolioScreen,
    },
    EventsAndTransactions: { screen: TransactionsScreen },
  },
  {
    mode: 'modal',
    navigationOptions: ({ navigation }) => ({
      headerStyle: Styles.header,
      headerTintColor: Colors.whiteBackground,
    }),
  }
);

export default PortfolioModalNavigator;
