import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IndexMypage from './Mypage/IndexMypage';
import MapStack from './Map/MapStack';

const Tab = createMaterialBottomTabNavigator();

class Main extends React.Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName='Main'
        activeColor='black'
        inactiveColor='white'
        barStyle={{ backgroundColor: '#62CCAD' }}
      >
        <Tab.Screen
          name='Main'
          component={MapStack}
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name='map-marker-radius'
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Mypage'
          component={IndexMypage}
          options={{
            tabBarLabel: 'Mypage',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='account' color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default Main;
