import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';

export default class Routes extends Component<{}> {
  render() {
    return (
      <Router>
        <Stack key='root' hideNavBar={true}>
          <Scene key='signin' component={SignIn} title='SignIn' />
          <Scene key='signup' component={SignUp} title='SignUp' />
        </Stack>
      </Router>
    );
  }
}
