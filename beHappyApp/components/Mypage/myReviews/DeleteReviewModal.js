import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableHighlight,
} from 'react-native';

export default function DeleteReviewModal({
  modalDeleteReviewShown,
  handleModalDeleteReviewShown,
  willDeleteModal,
  deleteReview,
  handelWillDeleteModal,
  deleteIndex,
}) {
  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={willDeleteModal || modalDeleteReviewShown ? true : false}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {willDeleteModal ? (
            <>
              <Text style={styles.modalText}>
                리뷰를 삭제하면 해당 예약건에 대해 리뷰를 쓰실 수 없습니다.
              </Text>
              <Text style={styles.confirmText}>
                리뷰를 정말 삭제하시겠습니까?
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableHighlight
                  style={styles.closeButton}
                  onPress={() => {
                    handleModalDeleteReviewShown(true);
                    deleteReview(deleteIndex);
                    handelWillDeleteModal(false);
                  }}
                >
                  <Text style={styles.textStyle}>삭제</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.closeButton}
                  onPress={() => {
                    handelWillDeleteModal(false);
                  }}
                >
                  <Text style={styles.textStyle}>취소</Text>
                </TouchableHighlight>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.modalText}>리뷰를 삭제했습니다</Text>
              <TouchableHighlight
                style={styles.closeButton}
                onPress={() => {
                  handleModalDeleteReviewShown(false);
                }}
              >
                <Text style={styles.textStyle}>닫기</Text>
              </TouchableHighlight>
            </>
          )}
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
  confirmText: {
    marginHorizontal: '8%',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    marginHorizontal: 30,
    backgroundColor: '#62CCAD',
    borderRadius: 2,
    paddingHorizontal: 13,
    paddingVertical: 5,
    elevation: 2,
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
