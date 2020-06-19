import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IndexMypage from './Mypage/IndexMypage';
import MapStack from './Map/MapStack';

const Tab = createBottomTabNavigator();

class Main extends React.Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName='Main'
        tabBarOptions={{
          // inactiveTintColor: 'white',
          // activeTintColor: 'black',
          // activeBackgroundColor: '#62CCAD',
          // inactiveBackgroundColor: '#62CCAD',
          inactiveTintColor: 'grey',
          activeTintColor: '#62CCAD',
          activeBackgroundColor: 'white',
          inactiveBackgroundColor: 'white',
          showLabel: false,
        }}
      >
        <Tab.Screen
          name='MapStack'
          component={MapStack}
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name='map-marker-radius'
                color={color}
                size={30}
              />
            ),
          }}
        />
        <Tab.Screen
          name='IndexMypage'
          component={IndexMypage}
          options={{
            tabBarLabel: 'Mypage',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='account' color={color} size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
export default Main;
