import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MenuIcon from '../components/MenuIcon';
import HomeScreen from '../screens/HomeScreen';
import InfoScreen from '../screens/InfoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { navStyles as styles } from '../styles';

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen, navigationOptions: { title: 'Omistukset' } },
    Profile: { screen: ProfileScreen },
    Info: { screen: InfoScreen },
    // TODO add more pages related to this tab
  },
  {
    // Shared options
    headerMode: 'float',
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => ({
      headerStyle: styles.header,
      headerTintColor: '#F3EBDD',
      headerRight: <MenuIcon navigation={navigation} />,
    }),
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Omistukset',
  tabBarIcon: ({ focused }: any) =>
    focused ? (
      <Image
        source={require('../assets/briefcase.png')}
        style={styles.iconActive}
      />
    ) : (
      <Image
        source={require('../assets/briefcase.png')}
        style={styles.iconInactive}
      />
    ),
};

export default HomeStack;
