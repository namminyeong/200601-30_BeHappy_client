import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginContainer from '../../containers/LoginContainer';
import Signup from './SignUp';

const signNavigator = createStackNavigator(
  {
    LoginContainer: {
      screen: LoginContainer,
      navigationOptions: { header: false },
    },
    Signup: {
      screen: Signup,
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
