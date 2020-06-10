/* eslint-disable react/prop-types */
// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Input } from './LogIn/Input';
import { TextLink } from './LogIn/TextLink';
import { Loading } from './LogIn/Loading';
import { Button } from './LogIn/Button';
import deviceStorage from '../service/DeviceStorage';
// const fetch = require('node-fetch');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.loginUser = this.loginUser.bind(this);
  }

  loginUser() {
    const { username, password } = this.state;

    fetch('http://13.209.16.103:4000/user/signin', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((payload) => {
        if (payload.errorCode) {
          if (payload.errorCode === 1) {
            alert('아이디를 확인해주세요.');
          }
          if (payload.errorCode === 2) {
            alert('비밀번호를 확인해주세요.');
          }
        } else {
          deviceStorage.saveKey('id_token', payload.token);
          this.props.controlLogin(this.props.status, payload.token);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { username, password } = this.state;
    const { form, section } = styles;

    return (
      <Fragment>
        <View style={form}>
          <View style={section}>
            <Input
              placeholder='user@email.com'
              label='UserName'
              value={username}
              onChangeText={(username) => this.setState({ username })}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              placeholder='password'
              label='Password'
              value={password}
              onChangeText={(password) => this.setState({ password })}
            />
          </View>

          <Button onPress={this.loginUser}>Login</Button>
        </View>
      </Fragment>
    );
  }
}

const styles = {
  form: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
    top: 200,
  },
  section: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red',
  },
};

export default Login;
