import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import t from '../../assets/i18n';
import MenuIcon from '../components/MenuIcon';
import CommissionsScreen from '../screens/CommissionsScreen';
import InfoScreen from '../screens/InfoScreen';
import { Colors, Styles } from '../styles';

const CommissionsStack = createStackNavigator(
  {
    Commissions: { screen: CommissionsScreen },
    Info: { screen: InfoScreen },
    // TODO add more pages related to this tab
  },
  {
    headerMode: 'float',
    initialRouteName: 'Commissions',
    navigationOptions: ({ navigation }) => ({
      headerStyle: Styles.header,
      headerTintColor: Colors.headerTint,
      headerTitleStyle: { textAlign: 'right', flex: 1, marginRight: 30 },
      headerLeft: <MenuIcon navigation={navigation} />,
    }),
  }
);

CommissionsStack.navigationOptions = {
  tabBarLabel: t('Navigation.Labels.Commissions'),
  tabBarIcon: ({ focused }: any) =>
    focused ? (
      <Image
        source={require('../assets/transaction.png')}
        style={Styles.iconActive}
      />
    ) : (
      <Image
        source={require('../assets/transaction.png')}
        style={Styles.iconInactive}
      />
    ),
  tabBarOnPress: ({ navigation, defaultHandler }: any) => {
    navigation.popToTop();
    defaultHandler();
  },
};

export default CommissionsStack;
