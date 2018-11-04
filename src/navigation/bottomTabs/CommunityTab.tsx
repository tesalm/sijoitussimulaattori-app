import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MenuIcon from '../components/MenuIcon';
import CommunityScreen from '../screens/CommunityScreen';
import { Colors, Styles } from '../styles';

const CommunityStack = createStackNavigator(
  {
    Community: { screen: CommunityScreen },
    // TODO add more pages related to this tab
  },
  {
    headerMode: 'float',
    initialRouteName: 'Community',
    navigationOptions: ({ navigation }) => ({
      headerStyle: Styles.header,
      headerTintColor: Colors.headerTint,
      headerTitleStyle: { textAlign: 'right', flex: 1, marginRight: 30 },
      headerLeft: <MenuIcon navigation={navigation} />,
    }),
  }
);

CommunityStack.navigationOptions = {
  tabBarLabel: 'Community',
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
  tabBarOnPress: ({ navigation, defaultHandler }: any) => {
    navigation.popToTop();
    defaultHandler();
  },
};

export default CommunityStack;