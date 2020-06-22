import React, { Fragment, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
} from 'react-native';
import Moment from 'moment';

import BookingDeleteModal from './BookingDeleteModal';

const MyBookingList = ({
  token,
  navigation,
  booking,
  deleteBookingState,
  modifyBookingState,
  index,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const changeModalVisible = (bool) => {
    setIsModalVisible(bool);
  };

  const date = Moment(new Date()).format('yyyy-MM-DD');
  const time = Moment(new Date()).format('hh:MM');

  return (
    <View style={styles.container}>
      <View style={styles.bookingInfo}>
        <Text style={styles.bookingDate}>
          {booking.date} / {booking.time.slice(0, 5)}
        </Text>
        <Text style={styles.bookingCenter}>{booking.center.centerName}</Text>
      </View>
      <View style={styles.btnSection}>
        {booking.bookingState === 'used' ? (
          <Fragment>
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                navigation.navigate('BookingReview', {
                  token,
                  booking,
                })
              }
            >
              <Text style={styles.btnText}>리뷰 쓰기</Text>
            </TouchableOpacity>

            <Text style={styles.blockText}>예약 수정</Text>

            <Text style={styles.blockText}>예약 취소</Text>
          </Fragment>
        ) : booking.bookingState === 'notUsed' ||
          booking.bookingState === 'reviewed' ? (
          <Fragment>
            <Text style={styles.blockText}>리뷰 쓰기</Text>

            <Text style={styles.blockText}>예약 수정</Text>

            <Text style={styles.blockText}>예약 취소</Text>
          </Fragment>
        ) : booking.bookingState === 'booked' &&
          booking.date === date &&
          booking.time.slice(0, 5) > time ? (
          <Fragment>
            <Text style={styles.blockText}>리뷰 쓰기</Text>

            <Text style={styles.blockText}>예약 수정</Text>

            <Text style={styles.blockText}>예약 취소</Text>
          </Fragment>
        ) : (booking.bookingState === 'booked' && booking.date !== date) ||
          booking.time.slice(0, 5) !== time ? (
          <Fragment>
            <Text style={styles.blockText}>리뷰 쓰기</Text>

            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                navigation.navigate('BookingModify', {
                  token,
                  booking,
                  modifyBookingState,
                  index,
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
          </Fragment>
        ) : (
          <Fragment />
        )}
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
            navigation={navigation}
            deleteBookingState={deleteBookingState}
            index={index}
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
  blockText: {
    padding: 10,
    backgroundColor: '#D1D1D1',
    marginTop: 5,
    marginRight: 10,
    borderRadius: 25,
    fontWeight: 'bold',
  },
});

export default MyBookingList;
