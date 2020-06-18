import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MapContainer from '../../containers/MapContainer';
import SearchNameContainer from '../../containers/SearchNameContainer';
import Details from './details/Details';
import DetailsHome from './details/DetailsHome';
import FilterContainer from '../../containers/FilterContainer';

const Stack = createStackNavigator();

function MapStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='MapContainer'
        component={MapContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='SearchNameContainer'
        component={SearchNameContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='FilterContainer'
        component={FilterContainer}
        options={{
          headerStyle: {
            backgroundColor: '#62CCAD',
          },
          headerTintColor: 'white',
          title: '필터',
        }}
      />
      <Stack.Screen
        name='Details'
        component={Details}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='DetailsHome'
        component={DetailsHome}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default MapStack;
