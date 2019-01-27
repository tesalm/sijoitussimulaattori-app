import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { restorePreviousLogin } from '../Auth/actions';
import { LoginState } from '../Auth/reducer';
import { createMainSwitchNavigator } from '../navigation/AppNavigator';
import { RootState } from '../redux/reducers';

export interface AppProps {
  loginStatus: LoginState;
  restoreLogin: typeof restorePreviousLogin;
}

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
  }

  componentDidMount = async () => {
    this.props.restoreLogin();
    // hold the splash screen a bit longer than the default behavior to avoid white screen flash.
    await new Promise((resolve) => setTimeout(resolve, 500));
    SplashScreen.hide();
  };

  render() {
    const { loginStatus } = this.props;

    {
      /*Temporary fix before splash / loading screen implementation*/
    }
    if (loginStatus === LoginState.CheckingPreviousLogin) {
      {
        /*Render empty view before the previous session (if exists) is restored*/
      }
      // return <View />;
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
  bindActionCreators(
    {
      restoreLogin: restorePreviousLogin,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
