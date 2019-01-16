import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { t } from '../../assets/i18n';
import { login, logout } from '../../Auth/actions';
import { UserData } from '../../models';
import { RootState } from '../../redux/reducers';
import { deleteUser } from '../../User/actions';

export interface ProfileScreenProps extends NavigationScreenProps {
  user?: UserData;
  deleteUserRequest: typeof deleteUser;
  loginRequest: typeof login;
}

class ProfileScreen extends React.Component<ProfileScreenProps> {
  static navigationOptions = { title: t('ProfilePage.Title') };

  constructor(public props: ProfileScreenProps) {
    super(props);
  }

  render() {
    const { user, deleteUserRequest, loginRequest } = this.props;

    let userText = '';
    if (user) {
      userText = 'Logged in as: ' + user.username;
    } else {
      userText = 'Not logged in';
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{userText}</Text>
        <Text>{t('ProfilePage.PlaceholderText')}</Text>
        <Button onPress={() => loginRequest()} title="Login" />
        <Button onPress={() => deleteUserRequest()} title="Delete Me" />
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user.userData,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deleteUserRequest: deleteUser,
      loginRequest: login,
      logoutRequest: logout,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
