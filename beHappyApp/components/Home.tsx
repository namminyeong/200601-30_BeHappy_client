import React, { Fragment } from 'react';

import Main from './Main';
import LoginContainer from '../containers/LoginContainer'

export default function Home({ isLogin }) {
  return (
    <Fragment>
      {isLogin ? (
        <Main />
      ) : (
          <LoginContainer />
        )}
    </Fragment>
  );
}
