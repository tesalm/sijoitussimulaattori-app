import { createStackNavigator } from 'react-navigation';
import CreatePortfolio from '../CreatePortfolio/CreatePortfolio';

const CreatePortfolioModalNavigator = createStackNavigator(
  {
    CreatePortfolio: {
      screen: CreatePortfolio,
    },
  },
  {
    mode: 'modal',
    navigationOptions: ({ navigation }) => ({}),
  }
);

export default CreatePortfolioModalNavigator;
