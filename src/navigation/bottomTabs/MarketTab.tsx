import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MenuIcon from '../components/MenuIcon';
import InfoScreen from '../screens/InfoScreen';
import MarketScreen from '../screens/MarketScreen';
import { navStyles as styles } from '../styles';

const MarketStack = createStackNavigator(
  {
    Market: { screen: MarketScreen, navigationOptions: { title: 'Markkina' } },
    Info: { screen: InfoScreen },
    // TODO add more pages related to this tab
  },
  {
    headerMode: 'float',
    initialRouteName: 'Market',
    navigationOptions: ({ navigation }) => ({
      headerRight: <MenuIcon navigation={navigation} />,
      headerStyle: styles.header,
      headerTintColor: '#F3EBDD',
    }),
  }
);

MarketStack.navigationOptions = {
  tabBarLabel: 'Markkina',
  tabBarIcon: ({ focused }: any) =>
    focused ? (
      <Image
        source={require('../assets/chart.png')}
        style={styles.iconActive}
      />
    ) : (
      <Image
        source={require('../assets/chart.png')}
        style={styles.iconInactive}
      />
    ),
  tabBarOnPress: ({ navigation, defaultHandler }: any) => {
    navigation.popToTop();
    defaultHandler();
  },
};

export default MarketStack;
