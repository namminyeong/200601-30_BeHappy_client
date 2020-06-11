const LOGIN = 'handleLogin_LOGIN';

export const controlLogin = (status, token) => {
  return { type: LOGIN, status, token };
};

const initialState = {
  isLogin: false,
  token: null,
};

function handleLogin(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        isLogin: action.status,
        token: action.token,
      });
    default:
      return state;
  }
}

export default handleLogin;
