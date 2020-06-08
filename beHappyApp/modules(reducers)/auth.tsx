const LOGIN = 'handleLogin_LOGIN'

export const controlLogin = (status) => {
  return { type: LOGIN, status }
};

const initialState = {
  isLogin: false
}

function handleLogin(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        isLogin: action.status
      }
    default:
      return state
  }
}

export default handleLogin