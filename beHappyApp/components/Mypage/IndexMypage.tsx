import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MypageContainer from '../../containers/MypageContainer';
import MyInfo from './MyInfo';
import MyReviews from './MyReviews';
import MyBookings from './MyBookings';
import BookMarkContainer from '../../containers/BookMarkContainer';

const Stack = createStackNavigator();

function IndexMypage() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='MypageContainer'
        component={MypageContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='MyInfo'
        component={MyInfo}
        options={{
          headerStyle: {
            backgroundColor: '#62CCAD',
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen name='BookMarkContainer' component={BookMarkContainer} />
      <Stack.Screen name='MyReviews' component={MyReviews} />
      <Stack.Screen name='MyBookings' component={MyBookings} />
    </Stack.Navigator>
  );
}
export default IndexMypage;
