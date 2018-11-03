import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MenuIcon from '../components/MenuIcon';
import HomeScreen from '../screens/HomeScreen';
import InfoScreen from '../screens/InfoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Colors, Styles } from '../styles';

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
    Info: { screen: InfoScreen },
    // TODO add more pages related to this tab
  },
  {
    // Shared options
    headerMode: 'float',
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => ({
      headerStyle: Styles.header,
      headerTintColor: Colors.headerTint,
      headerTitleStyle: { textAlign: 'right', flex: 1, marginRight: 30 },
      headerRight: <MenuIcon navigation={navigation} />,
    }),
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Portfolios',
  tabBarIcon: ({ focused }: any) =>
    focused ? (
      <Image
        source={require('../assets/briefcase.png')}
        style={Styles.iconActive}
      />
    ) : (
      <Image
        source={require('../assets/briefcase.png')}
        style={Styles.iconInactive}
      />
    ),
};

export default HomeStack;
