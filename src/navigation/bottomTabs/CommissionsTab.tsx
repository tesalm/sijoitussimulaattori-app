import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { t } from '../../assets/i18n';
import MenuIcon from '../components/MenuIcon';
import { RouteName } from '../routes';
import CommissionsScreen from '../screens/CommissionsScreen';
import { Colors, Styles } from '../styles';

const CommissionsStack = createStackNavigator(
  {
    Commissions: CommissionsScreen,
  },
  {
    headerMode: 'float',
    initialRouteName: RouteName.Commissions,
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
};

export default CommissionsStack;
