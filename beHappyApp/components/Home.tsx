import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import DeviceStorage from '../service/DeviceStorage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './Main';
import LoginContainer from '../containers/LoginContainer';
import Signup from '../components/Sign/SignUp';
import EntryCenter from '../components/Center/EntryCenter';
import UserPreference from '../components/Sign/UserPreference';
import SpecialtyPreference from '../components/Sign/SpecialtyPreference';

const Stack = createStackNavigator();
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.checkUser = this.checkUser.bind(this);
    this.changeLoading = this.changeLoading.bind(this);
  }

  componentDidMount() {
    this.changeLoading(true);
    DeviceStorage.loadJWT().then((value) => {
      this.checkUser(value);
    });
  }

  changeLoading(status) {
    this.setState({
      isLoading: status,
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
        this.changeLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <View style={styles.container}>
            <ActivityIndicator size='large' color='#0000ff' />
          </View>
        ) : (
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              {this.props.authState === -1 ? (
                <>
                  <Stack.Screen name='LoginContainer' component={LoginContainer} />
                  <Stack.Screen name='Signup' component={Signup} />
                  <Stack.Screen name='UserPreference' component={UserPreference} />
                  <Stack.Screen name='SpecialtyPreference' component={SpecialtyPreference} />
                </>
              ) : this.props.authState === 0 ? (
                <Stack.Screen name='Main' component={Main} />
              ) : (
                <Stack.Screen name='EntryCenter' component={EntryCenter} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
