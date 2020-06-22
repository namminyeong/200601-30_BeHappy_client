import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableHighlight,
} from 'react-native';

export default function GeoModal(props) {
  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={props.GeoModalShown}
      // onRequestClose={() => {
      //   this.props.controlGeoModalShown(false);
      // }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            검색 결과가 없습니다, 다른 지역을 검색해보세요
          </Text>

          <TouchableHighlight
            style={styles.closeButton}
            onPress={() => {
              props.controlGeoModalShown(false);
            }}
          >
            <Text style={styles.textStyle}>닫기</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  cities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  citiesBtn: {
    height: 40,
  },
  citiesText: {
    color: 'white',
    marginRight: 8,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#ababab',
  },
  citiesTextSelcted: {
    backgroundColor: '#62CCAD',
  },
  statesStart: {
    marginTop: 20,
  },
  states: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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
  closeButton: {
    backgroundColor: '#62CCAD',
    borderRadius: 2,
    paddingHorizontal: 13,
    paddingVertical: 5,
    elevation: 2,
  },
  modalText: {
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
