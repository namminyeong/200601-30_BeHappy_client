import React, { Fragment } from 'react';

import Main from './Main';
import LoginContainer from '../containers/LoginContainer';
import DeviceStorage from '../service/DeviceStorage';

export default class Home extends React.Component {
  componentDidMount() {
    DeviceStorage.loadJWT().then((value) => {
      if (value) {
        this.props.controlLogin(true, value);
      } else {
        this.props.controlLogin(false, null);
      }
    });
  }

  render() {
    return (
      <Fragment>
        {this.props.isLoginStatus ? <Main /> : <LoginContainer />}
      </Fragment>
    );
  }
}
