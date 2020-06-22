import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MypageContainer from '../../containers/MypageContainer';
import MyInfo from './MyInfo';
import MyReviewsContainer from '../../containers/MyReviewsContainer';
import ModifyReview from './myReviews/ModifyReview';
import BookMarkContainer from '../../containers/BookmarkContainer';
import MyBookingContainer from '../../containers/MyBookingContainer';
import BookingReview from './booking/BookingReview';
import BookingModify from './booking/BookingModify';

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
          headerTitle: '나의 정보',
          headerStyle: {
            backgroundColor: '#62CCAD',
          },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name='BookMarkContainer'
        component={BookMarkContainer}
        options={{
          title: '즐겨찾기',
          headerStyle: {
            backgroundColor: '#62CCAD',
          },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name='MyReviewsContainer'
        component={MyReviewsContainer}
        options={{
          title: '리뷰관리',
          headerStyle: {
            backgroundColor: '#62CCAD',
          },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name='ModifyReview'
        component={ModifyReview}
        options={{
          title: '리뷰 수정',
          headerStyle: {
            backgroundColor: '#62CCAD',
          },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name='MyBookingContainer'
        component={MyBookingContainer}
        options={{
          title: '예약 관리',
          headerStyle: {
            backgroundColor: '#62CCAD',
          },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name='BookingReview'
        component={BookingReview}
        options={{
          title: '리뷰 작성',
          headerStyle: {
            backgroundColor: '#62CCAD',
          },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name='BookingModify'
        component={BookingModify}
        options={{
          title: '예약 수정',
          headerStyle: {
            backgroundColor: '#62CCAD',
          },
          headerTintColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}
export default IndexMypage;
