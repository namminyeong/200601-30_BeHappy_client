import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  CheckBox,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Modal from 'react-native-modal';

export default class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectDate: false,
      isSelectTime: false,
      date: '',
      time: '',
      username: '',
      phone: '',
      content: '',
      modalVisible: false,
      isAgree: false,
    };
    this.clickAgainDate = this.clickAgainDate.bind(this);
  }

  clickAgainDate() {
    this.setState({ isSelectDate: false });
  }

  render() {
    const bookingTime = [
      '10:00 - 11:00',
      '11:00 - 12:00',
      '13:00 - 14:00',
      '14:00 - 15:00',
      '15:00 - 16:00',
      '16:00 - 17:00',
      '17:00 - 18:00',
    ];
    const {
      isSelectDate,
      isSelectTime,
      date,
      time,
      username,
      phone,
      content,
      modalVisible,
      isAgree,
    } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {isSelectDate ? (
            <Text onPress={this.clickAgainDate}>{date}</Text>
          ) : (
            <Calendar
              current={new Date()}
              monthFormat={'yyyy MM'}
              onDayPress={(selectDate) => {
                this.setState({
                  date: selectDate.dateString,
                  isSelectDate: true,
                  isSelectTime: false,
                });
              }}
            />
          )}
          {isSelectDate && !isSelectTime ? (
            <RNPickerSelect
              placeholder={{
                label: '시간 선택',
                value: '시간을 선택해주세요',
              }}
              onValueChange={(value) =>
                this.setState({ isSelectTime: true, time: value })
              }
              items={bookingTime.map((el) => {
                return { label: el, value: el };
              })}
            />
          ) : null}
          {isSelectTime ? (
            <View style={{ marginLeft: '2%' }}>
              <Text>{time}</Text>
              <View style={styles.textArea}>
                <Text>이{'    '}름</Text>
                <TextInput
                  style={styles.textBox}
                  value={username}
                  onChangeText={(username) =>
                    this.setState({ username: username })
                  }
                />
              </View>

              <View style={styles.textArea}>
                <Text>연락처</Text>
                <TextInput
                  style={styles.textBox}
                  value={phone}
                  onChangeText={(phone) => this.setState({ phone: phone })}
                />
              </View>
              <View style={{ marginBottom: 6 }}>
                <Text style={{ marginBottom: 4 }}>상담 이유</Text>
                <TextInput
                  style={styles.textBoxContent}
                  value={content}
                  onChangeText={(content) =>
                    this.setState({ content: content })
                  }
                />
              </View>
              <TouchableOpacity
                disabled={
                  username === '' || phone === '' || content === ''
                    ? true
                    : false
                }
                style={{ alignItems: 'center' }}
                onPress={() => {
                  this.setState({
                    modalVisible: true,
                  });
                  console.log(isAgree);
                }}
              >
                <Text>다음 단계</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <Modal isVisible={modalVisible} style={styles.modal}>
            <Text>예약 당일에는 취소와 수정이 불가능 합니다.</Text>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                onValueChange={() => this.setState({ isAgree: true })}
              />
              <Text>확인</Text>
            </View>
            <TouchableOpacity
              disabled={!isAgree}
              style={{ alignItems: 'center' }}
              onPress={() =>
                // POST 실행. 아마 여기말고 포스트함수 마지막에 초기화를 해야하지않을까??
                this.setState({
                  isSelectDate: false,
                  isSelectTime: false,
                  date: '',
                  time: '',
                  username: '',
                  phone: '',
                  content: '',
                  modalVisible: false,
                  isAgree: false,
                })
              }
            >
              <Text>예약 완료</Text>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0,
    marginLeft: '2%',
    marginRight: '2%',
  },
  textArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  textBox: {
    marginLeft: 10,
    width: '70%',
    borderBottomWidth: 2,
  },
  textBoxContent: {
    width: '90%',
    height: 100,
    borderWidth: 2,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    maxHeight: 300,
    backgroundColor: '#FFFFFF',
  },
});
