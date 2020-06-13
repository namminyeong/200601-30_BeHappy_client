import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import CenterMainContainer from '../../containers/CenterMainContainer';
import IndexCenterPage from './IndexCenterPage';

const Tab = createMaterialBottomTabNavigator();

export default function EntryCenter() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName='CenterPage'
        activeColor='black'
        inactiveColor='white'
        barStyle={{ backgroundColor: '#62CCAD' }}
      >
        <Tab.Screen
          name='CenterMain'
          component={CenterMainContainer}
          options={{
            tabBarLabel: 'Main',
            tabBarIcon: ({ color }) => (
              <Fontisto name='nursing-home' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='CenterPage'
          component={IndexCenterPage}
          options={{
            tabBarLabel: 'Mypage',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name='calendar-check'
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
