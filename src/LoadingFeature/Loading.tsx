import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { login } from '../Auth/actions';
import { UserAuth } from '../models';
import { RootState } from '../redux/reducers';
import LoggedInView from './components/HelloUser';
import LoadingView from './components/Loading';
import { loadingStyles as styles } from './styles';

export interface LoadingProps {
  user?: UserAuth;
  loginRequest: typeof login;
}

export interface LoadingState {}

export class Loading extends React.Component<LoadingProps, LoadingState> {
  constructor(props: LoadingProps) {
    super(props);
  }

  componentDidMount() {
    this.props.loginRequest();
  }

  render() {
    const { user } = this.props;
    if (user) {
      return (
        <View style={styles.container}>
          <LoggedInView user={user} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <LoadingView />
        </View>
      );
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.login.userAuth,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      loginRequest: login,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading);
