import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

import CenterList from './centerList';

const AddressModal = ({
  changeModalVisible,
  getCoordinate,
  centerInfo,
  setPhone,
  setLatitude,
  setLongitude,
  setAddressName,
  setRoadAddressName,
  selectCenter,
  setCenterName,
}) => {
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [height, setHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    console.log('centerInfo: ', centerInfo);
    getCoordinate();
  }, []);

  const closeModal = () => {
    changeModalVisible(false);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={true}
      style={styles.container}
    >
      <View style={[styles.modal, { width: width - 40, height: height - 60 }]}>
        {centerInfo.map((center, index) => (
          <CenterList
            key={index}
            center={center}
            centerName={center.centerName}
            latitude={center.latitude}
            longitude={center.longitude}
            phone={center.phone}
            addressName={center.addressName}
            roadAddressName={center.roadAddressName}
            setPhone={setPhone}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            setAddressName={setAddressName}
            setRoadAddressName={setRoadAddressName}
            selectCenter={selectCenter}
            setCenterName={setCenterName}
            closeModal={closeModal}
          />
        ))}
        <TouchableHighlight onPress={() => closeModal()}>
          <Text style={styles.text}>아니오</Text>
        </TouchableHighlight>
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
    // height: 100,
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

export default AddressModal;
