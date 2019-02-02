import { createStackNavigator } from 'react-navigation';
import { Colors } from '../App/colors';
import PortfolioScreen from '../PortfolioScreen/PortfolioScreen';
import { Styles } from './styles';

const PortfolioModalNavigator = createStackNavigator(
  {
    PortfolioModal: {
      screen: PortfolioScreen,
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

export default PortfolioModalNavigator;
