import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from '@react-navigation/stack';

import MapContainer from '../../containers/MapContainer';
import SearchNameContainer from '../../containers/SearchNameContainer';
import SearchGeoContainer from '../../containers/SearchGeoContainer';
import Details from './details/Details';
import DetailsHome from './details/DetailsHome';

const stackNav = createStackNavigator(
  {
    MapContainer: {
      screen: MapContainer,
      navigationOptions: { headerShown: false },
    },
    SearchNameContainer: {
      screen: SearchNameContainer,
      navigationOptions: { headerShown: false },
    },
    SearchGeoContainer: {
      screen: SearchGeoContainer,
      navigationOptions: { headerShown: false },
    },
    Details: {
      screen: Details,
      navigationOptions: { headerShown: false },
    },
    DetailsHome: {
      screen: DetailsHome,
      navigationOptions: { headerShown: false },
    },
  },
  {
    initialRouteName: 'MapContainer',
  }
);

const NavContainer = createAppContainer(stackNav);

class MapStack extends React.Component {
  render() {
    return <NavContainer />;
  }
}

// const Stack = createStackNavigator();

// function MapStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen name='MapContainer' component={MapContainer} />
//       <Stack.Screen
//         name='SearchNameContainer'
//         component={SearchNameContainer}
//       />
//       <Stack.Screen name='SearchGeoContainer' component={SearchGeoContainer} />
//       <Stack.Screen name='Details' component={Details} />
//       <Stack.Screen name='DetailsHome' component={DetailsHome} />
//     </Stack.Navigator>
//   );
// }

export default MapStack;
