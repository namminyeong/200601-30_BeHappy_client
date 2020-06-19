import React, { useState, Fragment } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
} from 'react-native';

import BookingDeleteModal from './BookingDeleteModal';

const MyBookingList = ({ token, navigation, booking }) => {
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
      {booking.length > 0 ? (
        <Fragment>
          <View>
            <Text style={styles.bookingDate}>
              {booking.date} / {booking.time}
            </Text>
            <Text style={styles.bookingCenter}>센터 이름</Text>
          </View>
          <View style={styles.btnSection}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('BookingReview')}
            >
              <Text style={styles.btnText}>리뷰 쓰기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
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
              <BookingDeleteModal changeModalVisible={changeModalVisible} />
            </Modal>
          </View>
        </Fragment>
      ) : (
        <Text>예약 목록이 없습니다.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 15,
    margin: 5,
    padding: 10,
  },
  bookingDate: {
    marginBottom: 10,
    fontSize: 16,
  },
  bookingCenter: {
    marginBottom: 10,
    fontSize: 16,
  },
  btnSection: {
    flexDirection: 'row',
  },
  btn: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#59cbbd',
    marginTop: 5,
    marginRight: 10,
    borderRadius: 10,
  },
  btnText: {
    fontWeight: 'bold',
  },
});

export default MyBookingList;
