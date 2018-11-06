import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { login } from '../../Auth/actions';
import { User } from '../../models';
import { RootState } from '../../redux/reducers';

export interface LoginViewProps extends NavigationScreenProps {
  user?: User;
  onLoginAsAnonym: typeof login;
}

export class LoginScreen extends React.Component<LoginViewProps> {
  constructor(props: LoginViewProps){
    super(props);
  }

  render() {
    const { user, onLoginAsAnonym } = this.props;
    if(user){
      this.props.navigation.navigate('App');
    }

    return(
    <View style={loginScrStyles.background}>
      {/*TODO container for the logo.*/}

      {/*Container for the anonymous login (button).*/}
      <View style={[loginScrStyles.containerRow, {flex: 0.2}]}>
      <View style={loginScrStyles.containerColumn}>

        <Text style={loginScrStyles.text}>Your first time at the ValueTown?</Text>
        <TouchableOpacity onPress={()=>onLoginAsAnonym()}><View style={loginScrStyles.button}>
          <Text style={loginScrStyles.buttonText}>CONTINUE AS NEW USER</Text>
        </View></TouchableOpacity>

      </View>
      </View>

      <Text>{user}</Text>

    </View>
    );
  }
}

const Colors = {
  background: '#004D40',
  buttons: '#FFFFFF',
  text: '#FFFFFF',
  buttonText: '#004D40',
};

const loginScrStyles = StyleSheet.create({
  background: {
    //<View>
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center', //'space-around',
    backgroundColor: Colors.background,
  },
  text: {
    color: Colors.text,
  },
  containerRow: {
    //<View>
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  containerColumn: {
    //<View>
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  button: {
    //<View> inside a <TouchableOpacity>
    backgroundColor: Colors.buttons,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 16,
  },
  buttonText: {
    color: Colors.buttonText,
  },
});

const mapStateToProps = (state: RootState) => ({
  user: state.login.user,
});
const mapDispatchToProps = (dispatch: Dispatch) => 
  bindActionCreators({
      onLoginAsAnonym: login,
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);