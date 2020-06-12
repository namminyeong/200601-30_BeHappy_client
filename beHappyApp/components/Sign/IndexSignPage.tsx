import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginContainer from '../../containers/LoginContainer';
import Login from './LogIn';
import Signup from './SignUp';
import UserPreference from './UserPreference';
import SpecialtyPreference from './SpecialtyPreference';

const signNavigator = createStackNavigator(
  {
    LoginContainer: {
      screen: LoginContainer,
      navigationOptions: { header: false },
    },
    Login: {
      screen: Login,
      navigationOptions: { header: false },
    },
    Signup: {
      screen: Signup,
      navigationOptions: { header: false },
    },
    UserPreference: {
      screen: UserPreference,
      navigationOptions: { header: false },
    },
    SpecialtyPreference: {
      screen: SpecialtyPreference,
      navigationOptions: { header: false },
    },
  },
  {
    initialRouteName: 'LoginContainer',
  }
);

const NavContainer = createAppContainer(signNavigator);

class IndexSignPage extends React.Component {
  render() {
    return <NavContainer />;
  }
}

export default IndexSignPage;
