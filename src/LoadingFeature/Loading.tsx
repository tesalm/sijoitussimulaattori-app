import React from 'react';
import { View, Text } from 'react-native';
import { loadingStyles as styles } from './styles';
import LoadingView from './components/Loading';
import LoggedInView from './components/HelloUser';
import { RootState } from '../redux/reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { login } from '../Auth/actions';
import { User } from '../models';

export interface LoadingProps {
  user?: User
  onLogin: typeof login;
}

export interface LoadingState {
  
}

export class Loading extends React.Component<LoadingProps, LoadingState> {
  constructor(props: LoadingProps) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() =>{
      this.props.onLogin();
    }, 3000)
  }

  render() {
    const { user } = this.props;
    if (user) {
      return (
        <View style={styles.container}>
          <LoggedInView user={user}/>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <LoadingView/>
        </View>
      )
    }

  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.login.user
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onLogin: login
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading);
