import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { t } from '../../assets/i18n';
import MenuIcon from '../components/MenuIcon';
import { RouteName } from '../routes';
import CommunityScreen from '../screens/CommunityScreen';
import { Colors, Styles } from '../styles';

const CommunityStack = createStackNavigator(
  {
    Community: CommunityScreen,
  },
  {
    headerMode: 'float',
    initialRouteName: RouteName.Community,
    navigationOptions: ({ navigation }) => ({
      headerStyle: Styles.header,
      headerTintColor: Colors.headerTint,
      headerTitleStyle: { textAlign: 'right', flex: 1, marginRight: 30 },
      headerLeft: <MenuIcon navigation={navigation} />,
    }),
  }
);

CommunityStack.navigationOptions = {
  tabBarLabel: t('Navigation.Labels.Community'),
  tabBarIcon: ({ focused }: any) =>
    focused ? (
      <Image
        source={require('../assets/community.png')}
        style={Styles.iconActive}
      />
    ) : (
      <Image
        source={require('../assets/community.png')}
        style={Styles.iconInactive}
      />
    ),
};

export default CommunityStack;
