import React from 'react';
import { ActivityIndicator, Image, ImageStyle, Modal, Text, TouchableOpacity, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { t } from '../assets/i18n';
import { login } from '../Auth/actions';
import { LoginState } from '../models';
import { RootState } from '../redux/reducers';
import { loginScreenStyles } from './styles';

export interface LoginViewProps extends Partial<NavigationInjectedProps> {
  loginState: LoginState;
  loginError?: Error; 
  onLoginAsAnonym: typeof login;
}

class LoginScreen extends React.Component<LoginViewProps> {
  constructor(props: LoginViewProps){
    super(props);
  }

  render() {
    const { onLoginAsAnonym, loginError, loginState } = this.props;

    // Define modal "screen" with activity indicator.
    const modalActivityIndicator = 
      <Modal animationType="none" 
        transparent={true}
        visible={true}
        onRequestClose={()=>{/*Mandatory to define; do nothing*/}}
        >
        <View style={loginScreenStyles.modalSplash}>
          <ActivityIndicator animating = {true} 
            color = '#FFFFFF'
            size = "large" 
          />
        </View>
      </Modal>;

    return(
    <View style={loginScreenStyles.background}>

      { // Show modal activity indicator on top of everything else when logging in.
        loginState === LoginState.LoggingIn && modalActivityIndicator
      }

      {/*Container for the logo.*/}
      <View style={loginScreenStyles.logoContainerRow}>
      <View style={loginScreenStyles.logoContainerColumn}>
        <Image resizeMode={'contain'}
          style={loginScreenStyles.logo as ImageStyle}
          source={require('../../resources/Logo.png')} />
      </View>
      </View>

      {/*Container for the anonymous login button.*/}
      <View style={loginScreenStyles.buttonContainerRow}>
      <View style={loginScreenStyles.buttonContainerColumn}>

        <Text style={loginScreenStyles.text}>
          {
            loginError ? 
            loginError.message : 
            t('LoginScreen.NewUserGreetee')
          }
        </Text>

        {/*Login button*/}
        <TouchableOpacity 
        onPress={() => onLoginAsAnonym()}>
          <View style={loginScreenStyles.button}>
            <Text style={loginScreenStyles.buttonText}>
              {
                (loginError ? 
                  t('LoginScreen.AfterErrButton') : 
                  t('LoginScreen.NewUserButton')
                ).toUpperCase()
              }
            </Text>
          </View>
        </TouchableOpacity>

      </View>
      </View>

    </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  loginState: state.login.loginState,
  loginError: state.login.loginError,
});
const mapDispatchToProps = (dispatch: Dispatch) => 
  bindActionCreators({
      onLoginAsAnonym: login,
    },
    dispatch
);

export default withNavigation (
  connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
);