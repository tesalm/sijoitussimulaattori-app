import React from 'react';
import { Text, View } from 'react-native';
import firebase from 'react-native-firebase';
import { NavigationScreenProps } from 'react-navigation';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class LoadingScreen extends React.Component<NavigationScreenProps> {
  constructor(props: NavigationScreenProps) {
    super(props);
    this.fetchCredentials();
  }

  fetchCredentials = async() => {
    console.log("Fetching credentials...");
    await sleep(1000);
    
    this.props.navigation.navigate( firebase.auth().currentUser ? 'App' : 'Login');
  };

  render() {
    return(
    <View style={{flex: 1, 
                  flexDirection: 'row', 
                  alignItems: 'center',
                  justifyContent: 'center', 
                  backgroundColor: '#004D40'
                  }}>
    <Text style={{color: '#FFFFFF', fontSize: 30}}>Loading...</Text>
    </View>
    );
  }
}