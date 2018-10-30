import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

const MenuIcon = (props: NavigationScreenProps) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
      <Image source={require('../assets/menu.png')} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    tintColor: '#F3EBDD',
    marginRight: 20,
  },
});

export default MenuIcon;
