import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules(reducers)';

import Main from './components/Main';
import SignIn from './containers/SignIn';
import Routes from './Routes';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor='#1c313a' barStyle='light-content' />
      {/* 로그인 구현되면 <Login />로 바꾸고 Login.tsx 내에서 아래의 메인 불러오면 됩니다*/}
      {/* <Main /> */}
      <Routes />
    </Provider>
  );
}
