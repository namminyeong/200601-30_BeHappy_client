import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
} from 'react-native';

import BookingDeleteModal from './BookingDeleteModal';

const MyBookingList = ({ token, navigation, booking, controlSpecialties }) => {
  console.log('MyBookingList 진입');
  console.log('token: ', token);
  console.log('navigation: ', navigation);
  console.log('booking: ', booking);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisible = (bool) => {
    setIsModalVisible(bool);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bookingInfo}>
        <Text style={styles.bookingDate}>
          {booking.date} / {booking.time}
        </Text>
        <Text style={styles.bookingCenter}>{booking.center.centerName}</Text>
      </View>
      <View style={styles.btnSection}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate('BookingReview', {
              token,
              booking,
              controlSpecialties,
            })
          }
        >
          <Text style={styles.btnText}>리뷰 쓰기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate('BookingModify', {
              token,
              booking,
            })
          }
        >
          <Text style={styles.btnText}>예약 수정</Text>
        </TouchableOpacity>
        <TouchableHighlight
          style={styles.btn}
          onPress={() => changeModalVisible(true)}
        >
          <Text style={styles.btnText}>예약 취소</Text>
        </TouchableHighlight>
        <Modal
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => changeModalVisible(false)}
          animationType='fade'
        >
          <BookingDeleteModal
            changeModalVisible={changeModalVisible}
            booking={booking}
            token={token}
          />
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  bookingInfo: {
    marginBottom: 10,
  },
  bookingDate: {
    marginBottom: 10,
    fontSize: 16,
  },
  bookingCenter: {
    fontSize: 16,
  },
  btnSection: {
    flexDirection: 'row',
  },
  btn: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#62CCAD',
    marginTop: 5,
    marginRight: 10,
    borderRadius: 25,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MyBookingList;
