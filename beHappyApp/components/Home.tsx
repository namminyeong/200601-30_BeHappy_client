import React, { Fragment } from 'react';

import Main from './Main';
import LoginContainer from '../containers/LoginContainer';
import DeviceStorage from '../service/DeviceStorage';

export default class Home extends React.Component {
  componentDidMount() {
    DeviceStorage.loadJWT().then((value) => {
      if (value) {
        this.props.controlLogin(true)
      } else {
        this.props.controlLogin(false)
      }
    })
  }

  render() {
    return (
      <Fragment>
        {this.props.isLoginStatus ? (
          <Main />
        ) : (
            <LoginContainer />
          )}
      </Fragment>
    );
  }
}
