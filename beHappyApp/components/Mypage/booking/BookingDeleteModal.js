import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Modal,
} from 'react-native';

import getEnvVars from '../../../environment';
const { ec2 } = getEnvVars();

const BookingDeleteModal = ({
  booking,
  token,
  deleteBookingState,
  index,
  navigation,
  handleModalDeleteBookingShown,
  modalDeleteBookingShown,
}) => {
  const bookingId = booking.id;

  const closeModal = () => {
    handleModalDeleteBookingShown(false);
  };

  const deleteBooking = () => {
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
          handleModalDeleteBookingShown(true);
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
    <Modal
      animationType='none'
      transparent={true}
      visible={modalDeleteBookingShown}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>예약을 취소하시겠습니까?</Text>
          <View style={styles.btnBox}>
            <TouchableHighlight
              style={styles.closeButton}
              onPress={() => deleteBooking(bookingId)}
            >
              <Text style={styles.textStyle}>예</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.closeButton}
              onPress={() => {
                handleModalDeleteBookingShown(false);
              }}
            >
              <Text style={styles.textStyle}>아니오</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    top: '33%',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 35,
    paddingHorizontal: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnBox: {
    flexDirection: 'row',
  },
  closeButton: {
    backgroundColor: '#62CCAD',
    borderRadius: 2,
    paddingHorizontal: 13,
    paddingVertical: 5,
    elevation: 2,
    marginLeft: 10,
    marginRight: 10,
  },
  modalText: {
    marginHorizontal: '13%',
    fontSize: 17,
    marginBottom: 20,
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BookingDeleteModal;
