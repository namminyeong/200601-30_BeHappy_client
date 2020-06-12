import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './Main';
import HomeContainer from '../containers/HomeContainer';
import LoginContainer from '../containers/LoginContainer';
import Signup from '../components/Sign/SignUp';
import EntryCenter from '../components/Center/EntryCenter';

const stackNav = createStackNavigator(
  {
    HomeContainer: {
      screen: HomeContainer,
      navigationOptions: {
        headerShown: false,
      },
    },
    Main: {
      screen: Main,
      navigationOptions: {
        headerShown: false,
      },
    },
    LoginContainer: {
      screen: LoginContainer,
      navigationOptions: {
        headerShown: false,
      },
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        headerShown: false,
      },
    },
    EntryCenter: {
      screen: EntryCenter,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'HomeContainer',
  }
);

const NavContainer = createAppContainer(stackNav);

function HomeStack() {
  return <NavContainer />;
}

export default HomeStack;
