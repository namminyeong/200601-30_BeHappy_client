import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableHighlight,
} from 'react-native';

export default function MapModal(props) {
  console.log('props', props);
  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={props.modalMapShown}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            검색 결과가 없습니다, 다른 곳으로 이동하시거나 조금 더 확대하여
            검색해보세요
          </Text>

          <TouchableHighlight
            style={styles.closeButton}
            onPress={() => {
              props.handleMapModalShows(false);
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
