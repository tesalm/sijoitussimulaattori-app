import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { restorePreviousLogin } from '../Auth/actions';
import { LoginState } from '../models';
import { createMainSwitchNavigator } from '../navigation/AppNavigator';
import { RootState } from '../redux/reducers';

export interface AppProps {
  loginStatus: LoginState;
  restoreLogin: typeof restorePreviousLogin;
}

class App extends React.Component<AppProps> {
  constructor(props: AppProps){
    super(props);
  }

  componentDidMount(){ 
    this.props.restoreLogin();
  }

  render(){
    const { loginStatus } = this.props;

    {/*Temporary fix before splash / loading screen implementation*/}
    if(loginStatus === LoginState.CheckingPreviousLogin){
      {/*Render empty view before the previous session (if exists) is restored*/}
      return <View />;
    }

    const showLoginScreen: boolean = loginStatus !== LoginState.LoggedIn;
    const MainNavigation = createMainSwitchNavigator(showLoginScreen);
    return <MainNavigation />;
  }
}

const mapStateToProps = (state: RootState) => ({
  loginStatus: state.login.loginState,
});

const mapDispatchToProps = (dispatch: Dispatch) => 
  bindActionCreators({
      restoreLogin: restorePreviousLogin,
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
