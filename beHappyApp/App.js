import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './modules(reducers)';

import Main from './components/Main';

const store = createStore(rootReducer);

export default function Index() {
  return (
    <Provider store={store}>
      {/* 로그인 구현되면 <Login />로 바꾸고 Login.tsx 내에서 아래의 메인 불러오면 됩니다*/}
      <Main />
    </Provider>
  );
}
