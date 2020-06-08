import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Map from './Map';
import Search from './Search';

const stackNav = createStackNavigator(
  {
    Map: {
      screen: Map,
      navigationOptions: {
        header: null,
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Map',
  }
);

const NavContainer = createAppContainer(stackNav);

class MapStack extends React.Component {
  render() {
    return <NavContainer />;
  }
}

export default MapStack;
