import React from 'react';
import DeviceStorage from '../service/DeviceStorage';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.checkUser = this.checkUser.bind(this);
    this.homeRoute = this.homeRoute.bind(this);
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
        this.homeRoute();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  homeRoute() {
    console.log('homeRoute', this.props.authState);
    if (this.props.authState === 1) {
      this.props.navigation.navigate('EntryCenter');
    } else if (this.props.authState === 0) {
      this.props.navigation.navigate('Main');
    } else {
      this.props.navigation.navigate('LoginContainer');
    }
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
