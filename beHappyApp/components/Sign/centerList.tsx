import React, { Fragment } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const CenterList = ({
  centerName,
  latitude,
  longitude,
  phone,
  addressName,
  roadAddressName,
  setPhone,
  setLatitude,
  setLongitude,
  setAddressName,
  setRoadAddressName,
  selectCenter,
  setCenterName,
  closeModal,
}) => (
  <Fragment>
    <View style={styles.centerInfo}>
      <Text style={styles.text}>센터 이름: {centerName}</Text>
      <Text style={styles.text}>지번 주소: {addressName}</Text>
      <Text style={styles.text}>도로명 주소: {roadAddressName}</Text>
      <Text style={styles.text}>전화 번호: {phone}</Text>
    </View>
    <View style={styles.submitBtn}>
      <TouchableOpacity
        onPress={() => {
          setCenterName(centerName);
          setPhone(phone);
          setLatitude(latitude);
          setLongitude(longitude);
          setAddressName(addressName);
          setRoadAddressName(roadAddressName);
          selectCenter(false);
          closeModal();
        }}
      >
        <Entypo name='check' size={27} />
      </TouchableOpacity>
    </View>
  </Fragment>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerInfo: {
    width: '90%',
    marginRight: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  submitBtn: {
    width: '10%',
    alignSelf: 'center',
  },
});

export default CenterList;
