import { LoginRequest, LoginSuccess, LogoutRequest } from '../actions';
import { authReducer, initialAuthState } from '../reducer';
import { User } from '../../models';


describe('>>> authReducer', () => {

  it('should handle LoginRequest', (done) => {
    const state = initialAuthState;
    expect(state.user).toBeUndefined();
    const loginAction = new LoginRequest();
    const stateAfterLoginRequest = authReducer(state, loginAction);
    expect(stateAfterLoginRequest.user).toBeUndefined();
    done();
  });

  it('should handle LoginSuccess', (done) => {
    const state = initialAuthState;
    expect(state.user).toBeUndefined();

    const user: User = {
      uid: 'fake-uuid',
      username: 'fake-username'
    }

    const loginAction = new LoginSuccess(user);
    const stateAfterLoginSuccess = authReducer(state, loginAction);
    expect(stateAfterLoginSuccess.user).not.toBeUndefined();
    // Cast to User because .user type is User | undefined
    expect((stateAfterLoginSuccess.user as User).uid).toEqual(user.uid);
    expect((stateAfterLoginSuccess.user as User).username).toEqual(user.username);
    done();
  })

  it('should handle LogoutRequest', (done) => {
    const state = initialAuthState;
    expect(state.user).toBeUndefined();

    const user: User = {
      uid: 'fake-uuid',
      username: 'fake-username'
    }

    const loginAction = new LogoutRequest();
    const stateAfterLoginSuccess = authReducer(state, loginAction);
    expect(stateAfterLoginSuccess.user).toBeUndefined();
    done();
  })

  it('should handle LogoutRequest', (done) => {
    const state = initialAuthState;
    expect(state.user).toBeUndefined();

    const user: User = {
      uid: 'fake-uuid',
      username: 'fake-username'
    }

    const loginAction = new LoginSuccess(user);
    const stateAfterLoginSuccess = authReducer(state, loginAction);
    expect(stateAfterLoginSuccess.user).toBeDefined();

    const logoutAction = new LogoutRequest();
    const stateAfterLogoutRequest = authReducer(state, logoutAction);
    expect(stateAfterLogoutRequest.user).toBeUndefined();
    done();
  })

})