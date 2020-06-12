import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MapContainer from '../../containers/MapContainer';
import SearchNameContainer from '../../containers/SearchNameContainer';
import SearchGeoContainer from '../../containers/SearchGeoContainer';
import DetailsHome from './details/DetailsHome';

const Stack = createStackNavigator();

function MapStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName='MapContainer'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='MapContainer' component={MapContainer} />
        <Stack.Screen
          name='SearchNameContainer'
          component={SearchNameContainer}
        />
        <Stack.Screen
          name='SearchGeoContainer'
          component={SearchGeoContainer}
        />
        <Stack.Screen name='DetailsHome' component={DetailsHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MapStack;
