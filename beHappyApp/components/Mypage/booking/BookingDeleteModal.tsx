import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

import getEnvVars from '../../../environment';
const { ec2 } = getEnvVars();

const BookingDeleteModal = ({
  changeModalVisible,
  booking,
  token,
  deleteBookingState,
  index,
  navigation,
}) => {
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const bookingId = booking.id;

  const closeModal = () => {
    changeModalVisible(false);
  };

  const deleteBooking = () => {
    console.log('deleteBooking 진입');
    console.log('index: ', index);
    fetch(ec2 + '/booking', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookingId }),
    })
      .then((res) => {
        if (res.status === 200) {
          alert('예약을 취소했습니다.');
          deleteBookingState(index);
          closeModal();
          navigation.navigate('MyBookingContainer');
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={true}
      style={styles.container}
    >
      <View style={[styles.modal, { width: width - 80 }]}>
        <View style={styles.textView}>
          <Text style={[styles.text, { fontSize: 20 }]}>
            예약을 취소하시겠습니까?
          </Text>
        </View>
        <View style={styles.btnView}>
          <TouchableHighlight
            style={styles.touchableHighlight}
            onPress={() => deleteBooking(bookingId)}
          >
            <Text style={styles.text}>예</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.touchableHighlight}
            onPress={() => closeModal()}
          >
            <Text style={styles.text}>아니오</Text>
          </TouchableHighlight>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modal: {
    height: 100,
    paddingTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
  },
  textView: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    margin: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnView: {
    width: '60%',
    flexDirection: 'row',
  },
  touchableHighlight: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
});

export default BookingDeleteModal;
