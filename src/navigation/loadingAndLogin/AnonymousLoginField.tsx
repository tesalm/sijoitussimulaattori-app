import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { t } from '../../assets/i18n';
import { login, restorePreviousLogin } from '../../Auth/actions';
import { User } from '../../models';
import { RootState } from '../../redux/reducers';

export interface LoginViewProps {
  user?: User;
  loginError?: Error; 
  onLoginAsAnonym: typeof login;
  restoreLogin: typeof restorePreviousLogin;
}

export interface LoginViewState {
  wait: boolean;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class AnonymousLoginField extends React.Component<LoginViewProps, LoginViewState> {
  constructor(props: LoginViewProps){
    super(props);
    this.state = { wait: true };
  }

  // Before a (new user) login, try to fetch alrady defined user credentials and update
  // them into the redux store.
  componentDidMount = async() => {

    await sleep(1300);
    firebase.auth().onAuthStateChanged((credentials: User) => {
      if (credentials) {
        this.props.restoreLogin(credentials);
      } else {
        this.setState({ wait: false});
      }
    });
  }

  render() {

    const { onLoginAsAnonym, loginError } = this.props;

    if(this.state.wait && !loginError){
      return(
        <View style={{
          flex: 1, flexDirection: 'row', alignItems: 'center', 
          justifyContent: 'center',  backgroundColor: '#004D40' }}>
    
          <Text style={{color: '#FFFFFF', fontSize: 30}}>{t('Loading.PleaseWait')}</Text>
    
        </View>
        );
    }

    return(
    <View style={loginScrStyles.background}>
      {/*Container for the logo.*/}
      <View style={[loginScrStyles.containerRow, {flex: 0.4}]}>
      <View style={[loginScrStyles.containerColumn, {flex: 0.8}]}>
        <Image resizeMode={'contain'}
          style={{flex:1, height: undefined, width: undefined}}
          source={require('../../../resources/Logo.png')} />
      </View>
      </View>

      {/*Container for the anonymous login (button).*/}
      <View style={[loginScrStyles.containerRow, {flex: 0.2}]}>
      <View style={[loginScrStyles.containerColumn, {flex: 0.5}]}>

        <Text style={loginScrStyles.text}>
          {loginError ? loginError.message : t('LoginScreen.NewUserGreetee')}
        </Text>
        <TouchableOpacity 
          onPress={() => {onLoginAsAnonym(); this.setState({wait: true});}}>
          <View style={loginScrStyles.button}>
            <Text style={loginScrStyles.buttonText}>
              {loginError ? t('LoginScreen.AfterErrButton') : t('LoginScreen.NewUserButton')}
            </Text>
          </View>
        </TouchableOpacity>

      </View>
      </View>

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
  loginError: state.login.error,
});
const mapDispatchToProps = (dispatch: Dispatch) => 
  bindActionCreators({
      onLoginAsAnonym: login,
      restoreLogin: restorePreviousLogin,
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(AnonymousLoginField);