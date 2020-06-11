import React, { Fragment } from 'react';

import Main from './Main';
import DeviceStorage from '../service/DeviceStorage';
import IndexSignPage from '../components/Sign/IndexSignPage';

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
        {this.props.isLoginStatus ? <Main /> : <IndexSignPage />}
      </Fragment>
    );
  }
}
