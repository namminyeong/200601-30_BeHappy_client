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

const MyBookingList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisible = (bool) => {
    setIsModalVisible(bool);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.bookingDate}>2020-06-17 / 18:00</Text>
        <Text style={styles.bookingCenter}>기린정신건강의학과의원</Text>
      </View>
      <View style={styles.btnSection}>
        <TouchableOpacity style={styles.btn}>
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
