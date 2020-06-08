import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules(reducers)';
import deviceStorage from './service/DeviceStorage';

import Login from './components/LogIn';
import Main from './components/Main';

const store = createStore(rootReducer);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };

    this.changeIsLogin = this.changeIsLogin.bind(this);
  }

  changeIsLogin(loginState) {
    this.setState({
      isLogin: loginState,
    });
  }

  componentDidMount() {
    if (deviceStorage.loadJWT()) {
      this.changeIsLogin(true);
    }
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.isLogin ? (
          <Main />
        ) : (
          <Login changeIsLogin={this.changeIsLogin} />
        )}
      </Provider>
    );
  }
}
