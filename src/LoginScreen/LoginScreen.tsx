import React from 'react';
import { Image, ImageStyle, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { t } from '../assets/i18n';
import { login } from '../Auth/actions';
import { LoginState } from '../Auth/reducer';
import { Button } from '../input/button';
import { RootState } from '../redux/reducers';
import { ModalActivityIndicator } from './components/ModalActivityIndicator';
import { loginScreenStyles } from './styles';

export interface LoginViewProps {
  loginState: LoginState;
  loginError?: Error;
  onLoginAsAnonym: typeof login;
}

type LoginViewPropsWithNavigation = LoginViewProps & NavigationScreenProps;

class LoginScreen extends React.Component<LoginViewPropsWithNavigation> {
  constructor(props: LoginViewPropsWithNavigation) {
    super(props);
  }

  render() {
    const { onLoginAsAnonym, loginError, loginState } = this.props;

    const loginButtonText = loginError
      ? t('LoginScreen.AfterErrButton')
      : t('LoginScreen.NewUserButton');
    const loginGreeting = loginError
      ? loginError.message
      : t('LoginScreen.NewUserGreeting');

    return (
      <View style={loginScreenStyles.background}>
        {// Show modal activity indicator on top of everything else when logging in.
        loginState === LoginState.LoggingIn && <ModalActivityIndicator />}
        {/*Logo.*/}
        <Image
          style={loginScreenStyles.logo as ImageStyle}
          source={require('../assets/images/Logo.png')}
        />
        {/*New user greetee and anonymous login button.*/}
        <View style={loginScreenStyles.buttonContainer}>
          <Text style={loginScreenStyles.text}>{loginGreeting}</Text>
          <Button
            buttonText={loginButtonText}
            onPress={onLoginAsAnonym}
            lightBackground={true}
          />
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
  bindActionCreators(
    {
      onLoginAsAnonym: login,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

export { LoginScreen as LoginScreenTest };
