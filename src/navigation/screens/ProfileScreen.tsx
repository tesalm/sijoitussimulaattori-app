import React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { t } from '../../assets/i18n';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { Dispatch, bindActionCreators } from 'redux';
import { deleteCurrentUser, login, logout } from '../../Auth/actions';
import { User } from '../../models';

export interface ProfileScreenProps extends NavigationScreenProps {
  user?: User;
  deleteCurrentUserRequest: typeof deleteCurrentUser;
  loginRequest: typeof login;
}

export class ProfileScreen extends React.Component<
  ProfileScreenProps
> {

  constructor(public props: ProfileScreenProps) {
    super(props);
  }

  static navigationOptions = { title: t('ProfilePage.Title') };

  render() {
    const { user, deleteCurrentUserRequest, loginRequest } = this.props;

    let userText = '';
    if(user) {
      userText = 'Logged in as: ' + user.username;
    } else {
      userText = 'Not logged in';
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{userText}</Text>
        <Text>{t('ProfilePage.PlaceholderText')}</Text>
        <Button onPress={loginRequest} title="Login"></Button>
        <Button onPress={deleteCurrentUserRequest} title="Delete Me"></Button>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.login.user
})

const mapDispatchToProps = (dispatch: Dispatch) => (
  bindActionCreators(
    {
      deleteCurrentUserRequest: deleteCurrentUser,
      loginRequest: login,
      logoutRequest: logout
    },
    dispatch
  )
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);