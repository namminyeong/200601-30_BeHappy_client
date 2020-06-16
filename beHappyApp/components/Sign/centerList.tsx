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
}) => (
  <Fragment>
    <Text>{centerName}</Text>
    <Text>{latitude}</Text>
    <Text>{longitude}</Text>
    <Text>{phone}</Text>
    <Text>{addressName}</Text>
    <Text>{roadAddressName}</Text>
    <TouchableOpacity
      onPress={() => {
        setCenterName(centerName);
        setPhone(phone);
        setLatitude(latitude);
        setLongitude(longitude);
        setAddressName(addressName);
        setRoadAddressName(roadAddressName);
        selectCenter(false);
      }}
    >
      <Text>선택</Text>
    </TouchableOpacity>
  </Fragment>
);

export default CenterList;
