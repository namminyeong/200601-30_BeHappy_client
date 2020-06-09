import React, { Fragment } from 'react';

import Main from './Main';
import LoginContainer from '../containers/LoginContainer';
import DeviceStorage from '../service/DeviceStorage';
import EntryCenter from './Center/EntryCenter';

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
          // ! login한 사람이 center인지 구분 필요
          // <EntryCenter />
        ) : (
            <LoginContainer />
          )}
      </Fragment>
    );
  }
}
