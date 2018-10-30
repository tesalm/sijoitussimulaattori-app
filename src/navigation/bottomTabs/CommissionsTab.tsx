import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MenuIcon from '../components/MenuIcon';
import CommissionsScreen from '../screens/CommissionsScreen';
import InfoScreen from '../screens/InfoScreen';
import { navStyles as styles } from '../styles';

const CommissionsStack = createStackNavigator(
  {
    Commissions: {
      screen: CommissionsScreen,
      navigationOptions: { title: 'Toimeksiannot' },
    },
    Info: { screen: InfoScreen },
    // TODO add more pages related to this tab
  },
  {
    headerMode: 'float',
    initialRouteName: 'Commissions',
    navigationOptions: ({ navigation }) => ({
      headerStyle: styles.header,
      headerTintColor: '#F3EBDD',
      headerRight: <MenuIcon navigation={navigation} />,
    }),
  }
);

CommissionsStack.navigationOptions = {
  tabBarLabel: 'Toimeksiannot',
  tabBarIcon: ({ focused }: any) =>
    focused ? (
      <Image
        source={require('../assets/transaction.png')}
        style={styles.iconActive}
      />
    ) : (
      <Image
        source={require('../assets/transaction.png')}
        style={styles.iconInactive}
      />
    ),
  tabBarOnPress: ({ navigation, defaultHandler }: any) => {
    navigation.popToTop();
    defaultHandler();
  },
};

export default CommissionsStack;
