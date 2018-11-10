import React from 'react';
import { connect } from 'react-redux';

import { User } from '../models';
import { createConditionalSwitchNavigator } from '../navigation/AppNavigator';
import { RootState } from '../redux/reducers';

export interface AppProps {
  user?: User;
}

export class App extends React.Component<AppProps> {
  constructor(props: AppProps){
    super(props);
  }

  render(){
    const { user } = this.props;
    const Layout = createConditionalSwitchNavigator( user != undefined );
    return <Layout />;
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.login.user,
});

export default connect(mapStateToProps)(App);
