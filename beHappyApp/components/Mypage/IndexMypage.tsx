import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MypageContainer from '../../containers/MypageContainer';
import MyInfo from './MyInfo';
import MyReviewsContainer from '../../containers/MyReviewsContainer';
import ModifyReview from './ModifyReview';
import MyBookings from './MyBookings';
import BookMarkContainer from '../../containers/BookmarkContainer';
import MyBookingContainer from '../../containers/MyBookingContainer';
import BookingReview from './booking/BookingReview';

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
      <Stack.Screen
        name='MyReviewsContainer'
        component={MyReviewsContainer}
        options={{
          title: '리뷰관리',
        }}
      />
      <Stack.Screen
        name='ModifyReview'
        component={ModifyReview}
        options={{
          title: '리뷰 수정하기',
        }}
      />
      <Stack.Screen
        name='MyBookingContainer'
        component={MyBookingContainer}
        options={{ title: '예약 관리' }}
      />
      <Stack.Screen
        name='BookingReview'
        component={BookingReview}
        options={{ title: '리뷰 작성' }}
      />
    </Stack.Navigator>
  );
}
export default IndexMypage;
