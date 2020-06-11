import React, { Fragment } from 'react';

import Main from './Main';
import DeviceStorage from '../service/DeviceStorage';
import IndexSignPage from '../components/Sign/IndexSignPage';
import EntryCenter from '../components/Center/EntryCenter';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.checkUser = this.checkUser.bind(this);
  }

  componentDidMount() {
    DeviceStorage.loadJWT().then((value) => {
      this.checkUser(value);
    });
  }

  checkUser(token) {
    fetch('http://13.209.16.103:4000/auth', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === (200 || 401 || 403)) {
          return res.json();
        }
        return '';
      })
      .then((payload) => {
        if (typeof payload === 'object') {
          if (payload.isAdmin !== undefined) {
            if (payload.isAdmin) {
              this.props.controlLogin(1, token);
            } else {
              this.props.controlLogin(0, token);
            }
          } else {
            this.props.controlLogin(-1, null);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log('authState: ', this.props.authState);
    return (
      <Fragment>
        {this.props.authState >= 0 ? (
          this.props.authState === 0 ? (
            <Main />
          ) : (
            <EntryCenter />
          )
        ) : (
          <IndexSignPage />
        )}
      </Fragment>
    );
  }
}
