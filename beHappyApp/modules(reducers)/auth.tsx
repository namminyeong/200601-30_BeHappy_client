const LOGIN = 'handleLogin_LOGIN';

export const controlLogin = (status, token) => {
  return { type: LOGIN, status, token };
};

// auth state
// -1: 로그인 페이지
// 0: 유저 페이지
// 1: 센터 페이지
const initialState = {
  authState: -1,
  token: null,
};

function handleLogin(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        authState: action.status,
        token: action.token,
      });
    default:
      return state;
  }
}

export default handleLogin;
