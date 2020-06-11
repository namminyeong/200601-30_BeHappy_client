import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MapContainer from '../../containers/MapContainer';
import SearchNameContainer from '../../containers/SearchNameContainer';
import SearchGeoContainer from '../../containers/SearchGeoContainer';
import DetailsHome from './DetailsHome';

const stackNav = createStackNavigator(
  {
    MapContainer: {
      screen: MapContainer,
      navigationOptions: {
        headerShown: false,
      },
    },
    SearchNameContainer: {
      screen: SearchNameContainer,
      navigationOptions: {
        headerShown: false,
      },
    },
    SearchGeoContainer: {
      screen: SearchGeoContainer,
      navigationOptions: {
        headerShown: false,
      },
    },
    DetailsHome: {
      screen: DetailsHome,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'MapContainer',
  }
);

const NavContainer = createAppContainer(stackNav);

function MapStack() {
  return <NavContainer />;
}

export default MapStack;
