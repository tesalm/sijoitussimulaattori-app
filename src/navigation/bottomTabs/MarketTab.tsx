import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import t from '../../assets/i18n';
import MenuIcon from '../components/MenuIcon';
import InfoScreen from '../screens/InfoScreen';
import MarketScreen from '../screens/MarketScreen';
import { Colors, Styles } from '../styles';

const MarketStack = createStackNavigator(
  {
    Market: { screen: MarketScreen },
    Info: { screen: InfoScreen },
    // TODO add more pages related to this tab
  },
  {
    headerMode: 'float',
    initialRouteName: 'Market',
    navigationOptions: ({ navigation }) => ({
      headerStyle: Styles.header,
      headerTintColor: Colors.headerTint,
      headerTitleStyle: { textAlign: 'right', flex: 1, marginRight: 30 },
      headerLeft: <MenuIcon navigation={navigation} />,
    }),
  }
);

MarketStack.navigationOptions = {
  tabBarLabel: t('Navigation.Labels.Stocks'),
  tabBarIcon: ({ focused }: any) =>
    focused ? (
      <Image
        source={require('../assets/chart.png')}
        style={Styles.iconActive}
      />
    ) : (
      <Image
        source={require('../assets/chart.png')}
        style={Styles.iconInactive}
      />
    ),
  tabBarOnPress: ({ navigation, defaultHandler }: any) => {
    navigation.popToTop();
    defaultHandler();
  },
};

export default MarketStack;
