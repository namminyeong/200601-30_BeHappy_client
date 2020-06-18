import React, { Fragment } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const CenterList = ({
  center,
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
    <Text>센터 이름: {centerName}</Text>
    <Text>지번 주소: {addressName}</Text>
    <Text>도로명 주소: {roadAddressName}</Text>
    <Text>전화 번호: {phone}</Text>
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
      <Text>선택</Text>
    </TouchableOpacity>
  </Fragment>
);

export default CenterList;
