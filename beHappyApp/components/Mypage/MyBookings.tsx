import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import MyBookingList from './booking/MyBookingList';

export default function MyBookings({ token, navigation }) {
  console.log('MyBookings 진입');
  console.log('token: ', token);
  console.log('navigation: ', navigation);
  // const [bookings, setBookings] = useState([]);

  // useEffect(() => {
  //   console.log('MyBookings Get 실행');
  //   fetch('http://13.209.16.103:4000/booking', {
  //     method: 'GET',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => {
  //       console.log('res: ', res);
  //       if (res.status === 200 || res.status === 403) {
  //         return res.json();
  //       }
  //       return '';
  //     })
  //     .then((payload) => {
  //       console.log('payload: ', payload);
  //       if (typeof payload === 'object') {
  //         if (!payload.errorCode) {
  //           setBookings(payload);
  //         } else if (payload.errorCode === 8) {
  //           alert('예약이 없습니다.');
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, bookings);

  return (
    <SafeAreaView style={styles.container}>
      {/* {bookings.map((booking) => ( */}
      <MyBookingList
        token={token}
        navigation={navigation}
        // booking={booking}
      />
      {/* ))} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
  },
});
