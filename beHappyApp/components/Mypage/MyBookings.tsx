import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';

import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();

import MyBookingList from './booking/MyBookingList';

export default function MyBookings({ token, navigation }) {
  console.log('MyBookings 진입');
  console.log('token: ', token);
  console.log('navigation: ', navigation);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookingList();
  }, bookings);

  const getBookingList = () => {
    console.log('MyBookings Get 실행');
    fetch(ec2 + '/booking', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200 || res.status === 403) {
          return res.json();
        }
        return '';
      })
      .then((payload) => {
        console.log('payload: ', payload);
        if (typeof payload === 'object') {
          if (!payload.errorCode) {
            setBookings(payload);
            console.log('bookings: ', bookings);
          } else if (payload.errorCode === 8) {
            console.log('there is no booking by userId');
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <MyBookingList
            key={index}
            token={token}
            navigation={navigation}
            booking={booking}
          />
        ))
      ) : (
        <Text>예약 목록이 없습니다.</Text>
      )}
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
