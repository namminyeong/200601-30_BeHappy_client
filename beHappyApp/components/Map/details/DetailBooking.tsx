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
import Moment from 'moment';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import DeviceStorage from '../../../service/DeviceStorage';

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
      isUserInfo: false,
      alertModal: false,
      isAgree: false,
      completeModal: false,
      bookingTime: [
        ['09:00', false],
        ['10:00', false],
        ['11:00', false],
        ['13:00', false],
        ['14:00', false],
        ['15:00', false],
        ['16:00', false],
        ['17:00', false],
      ],
      centerBookingData: [
        {
          date: '2020-06-20',
          time: '14:00:00',
        },
        {
          date: '2020-06-21',
          time: '13:00:00',
        },
      ],
    };
    this.againSelectDate = this.againSelectDate.bind(this);
    this.againSelectTime = this.againSelectTime.bind(this);
    this.resetAllState = this.resetAllState.bind(this);
    this.postBooking = this.postBooking.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.getCenterBooking = this.getCenterBooking.bind(this);
    this.blockTime = this.blockTime.bind(this);
    this.backTime = this.backTime.bind(this);
    this.checkUserInfo = this.checkUserInfo.bind(this);
  }

  getCenterBooking() {
    const { centerBookingData, date } = this.state;

    // fetch(`http://13.209.16.103:4000/booking/center?centerId=${this.props.route.params.id}&date=${data}`, {
    //   method: 'GET',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    // }).then((res) => {
    //   this.setState({
    //     centerBookingData: res.result
    //    })
    // });
    //console.log('getCenterBooking', centerBookingData, date);
  }

  postBooking(token) {
    const { date, time, username, phone, content } = this.state;

    // fetch('http://13.209.16.103:4000/booking', {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({
    //     centerId: this.props.route.params.id,
    //     date: date,
    //     time: time + ':00',
    //     name: username,
    //     phone: phone,
    //     content: content,
    //   }),
    // }).then((res) => {
    //   return res.status;
    // });
    //console.log('postBooking', date, time, username, phone, content);
    this.setState({
      completeModal: true,
    });
  }

  againSelectDate() {
    this.setState({
      isSelectDate: false,
      isSelectTime: false,
      date: '',
      time: '',
      username: '',
      phone: '',
      content: '',
    });
  }

  againSelectTime() {
    this.setState({
      isSelectTime: false,
      time: '',
      username: '',
      phone: '',
      content: '',
      bookingTime: this.state.bookingTime,
    });
  }

  resetAllState() {
    this.setState({
      isSelectDate: false,
      isSelectTime: false,
      date: '',
      time: '',
      username: '',
      phone: '',
      content: '',
      alertModal: false,
      isAgree: false,
    });
    setTimeout(() => {
      this.setState({ completeModal: false });
    }, 1500);
  }

  changeTime(index) {
    let newState = this.state.bookingTime;
    let present = newState[index][1];
    newState[index][1] = !present;
    this.setState({
      bookingTime: newState,
    });
  }

  blockTime(centerBookingData, selectDate) {
    const { bookingTime } = this.state;
    let currentDate = Moment(new Date()).format('YYYY-MM-DD');
    let currentTime = Moment(new Date()).format('HH');

    for (let i = 0; i < centerBookingData.length; i++) {
      bookingTime.map((time) =>
        time.includes(centerBookingData[i].time.slice(0, 5)) ||
        (selectDate.dateString === currentDate
          ? time[0][0] + time[0][1] <= currentTime
          : null)
          ? (time[1] = true)
          : null
      );
    }
  }

  backTime(time) {
    const { bookingTime } = this.state;
    bookingTime.map((data) =>
      data.includes(time[0]) ? (data[1] = false) : data
    );
  }

  checkUserInfo() {
    const { username, phone, content } = this.state;
    username === '' || phone === '' || content === ''
      ? this.setState({
          isUserInfo: false,
        })
      : this.setState({
          isUserInfo: true,
        });
    console.log(this.state.isUserInfo);
  }

  render() {
    const {
      isSelectDate,
      isSelectTime,
      date,
      time,
      username,
      phone,
      content,
      alertModal,
      isAgree,
      bookingTime,
      centerBookingData,
      completeModal,
      isUserInfo,
    } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {!isAgree ? (
            <View>
              {!isSelectDate ? (
                <Calendar
                  current={new Date()}
                  minDate={new Date()}
                  monthFormat={'yyyy MM'}
                  onDayPress={(selectDate) => {
                    this.getCenterBooking();
                    this.setState({
                      date: selectDate.dateString,
                      isSelectDate: true,
                      isSelectTime: false,
                    });
                    this.blockTime(centerBookingData, selectDate);
                  }}
                />
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <View style={styles.selectBox}>
                    <Text>
                      날{'    '}짜{'    '}
                      {date}
                    </Text>
                    <AntDesign
                      name='calendar'
                      size={20}
                      style={{ paddingRight: 4 }}
                      onPress={() => {
                        this.againSelectDate();
                        time === '' ? null : this.backTime(time);
                      }}
                    />
                  </View>
                </View>
              )}

              {isSelectDate && !isSelectTime ? (
                <View style={{ alignContent: 'center' }}>
                  <View style={styles.time}>
                    {bookingTime.map((data, index) => (
                      <TouchableOpacity
                        key={'bookingTime_' + index}
                        disabled={data[1] ? true : false}
                        onPress={() => {
                          this.changeTime(index);
                          this.setState({ isSelectTime: true, time: data });
                        }}
                      >
                        <Text
                          style={data[1] ? styles.notblocked : styles.blocked}
                        >
                          {data}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ) : null}

              {isSelectTime ? (
                <View>
                  <View style={styles.selectBox}>
                    <Text>
                      시{'    '}간{'    '}
                      {time}
                    </Text>
                    <MaterialIcons
                      name='access-time'
                      size={20}
                      style={{ paddingRight: 4 }}
                      onPress={() => {
                        this.backTime(time);
                        this.againSelectTime();
                      }}
                    />
                  </View>
                  <View style={styles.userinfo}>
                    <View style={styles.textArea}>
                      <Text>이{'    '}름</Text>
                      <TextInput
                        style={styles.textBox}
                        value={username}
                        onChangeText={(username) => {
                          this.setState({ username: username });
                          this.checkUserInfo();
                        }}
                      />
                    </View>
                    <View style={styles.textArea}>
                      <Text>연락처</Text>
                      <TextInput
                        style={styles.textBox}
                        value={phone}
                        onChangeText={(phone) => {
                          this.setState({ phone: phone });
                          this.checkUserInfo();
                        }}
                      />
                    </View>
                    <View
                      style={{ marginTop: 6, marginBottom: 6, marginLeft: 4 }}
                    >
                      <Text style={{ marginBottom: 8 }}>상담 이유</Text>
                      <TextInput
                        style={styles.textBoxContent}
                        value={content}
                        multiline={true}
                        onChangeText={(content) => {
                          this.setState({ content: content });
                          this.checkUserInfo();
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                      disabled={!isUserInfo}
                      onPress={() => {
                        this.setState({
                          alertModal: true,
                        });
                      }}
                    >
                      <View
                        style={
                          !isUserInfo
                            ? styles.notCompleteButton
                            : styles.completeButton
                        }
                      >
                        <Entypo
                          name='check'
                          size={24}
                          style={{
                            color: !isUserInfo ? '#FFFFFF' : '#000000',
                          }}
                        />
                        <Text
                          style={{
                            color: !isUserInfo ? '#FFFFFF' : '#000000',
                            fontSize: 16,
                          }}
                        >
                          다음 단계
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
              <Modal isVisible={alertModal}>
                <View style={styles.modal}>
                  <View>
                    <Text style={{ marginTop: '10%' }}>
                      개인정보 수집과 제공에 동의합니다.
                    </Text>
                    <Text>
                      잦은 예약 변경과 취소시 이후 예약이 제한 될 수 있습니다.
                    </Text>
                    <Text style={{ color: '#941818', marginTop: 4 }}>
                      예약 당일에는 수정과 취소가 불가능 합니다.
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 20,
                    }}
                  >
                    <CheckBox
                      onValueChange={() =>
                        this.setState({ isAgree: true, alertModal: false })
                      }
                    />
                    <Text>확인</Text>
                  </View>
                </View>
              </Modal>
            </View>
          ) : (
            <View>
              <View style={styles.selectBox}>
                <Text>
                  날{'    '}짜{'    '}
                  {date}
                </Text>
              </View>
              <View style={styles.selectBox}>
                <Text>
                  시{'    '}간{'    '}
                  {time}
                </Text>
              </View>
              <View style={styles.selectBox}>
                <Text>
                  이{'    '}름{'    '}
                  {username}
                </Text>
              </View>
              <View style={styles.selectBox}>
                <Text>
                  연락처{'    '}
                  {phone.slice(0, 3) +
                    '-' +
                    phone.slice(3, 7) +
                    '-' +
                    phone.slice(7)}
                </Text>
              </View>
              <View style={styles.userinfo}>
                <Text style={{ marginBottom: 6 }}>상담 이유</Text>
                <Text>{content}</Text>
              </View>
              <TouchableOpacity
                disabled={!isAgree}
                style={{ alignItems: 'center' }}
                onPress={() => {
                  DeviceStorage.loadJWT()
                    .then((value) => {
                      this.postBooking(value);
                    })
                    .then(() => {
                      this.resetAllState();
                    });
                }}
              >
                <View style={styles.completeButton}>
                  <Entypo name='check' size={24} />
                  <Text style={{ fontSize: 16 }}>예약 하기</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        <Modal isVisible={completeModal}>
          <View style={styles.modal}>
            <Text style={{ fontSize: 18 }}>예약이 완료되었습니다.</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  time: {
    marginTop: '2%',
    marginLeft: '2%',
    marginRight: '2%',
    paddingBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  selectBox: {
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 15,
    left: '2%',
    width: '96%',
    marginTop: 15,
    marginBottom: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blocked: {
    marginTop: 9,
    marginLeft: 10,
    marginRight: 10,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#62CCAD',
    color: '#FFFFFF',
    fontSize: 20,
  },
  notblocked: {
    marginTop: 9,
    marginLeft: 10,
    marginRight: 10,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#D1D1D1',
    color: '#FFFFFF',
    fontSize: 20,
  },
  userinfo: {
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 15,
    left: '2%',
    width: '96%',
    marginTop: 15,
    marginBottom: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    marginLeft: 4,
  },
  textBox: {
    marginLeft: 16,
    width: '80%',
    borderBottomWidth: 1,
  },
  textBoxContent: {
    width: '98%',
    height: 200,
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  completeButton: {
    borderRadius: 20,
    paddingHorizontal: 17,
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 15,
    marginBottom: 20,
    width: 120,
    height: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notCompleteButton: {
    borderRadius: 20,
    paddingHorizontal: 17,
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 15,
    marginBottom: 20,
    width: 120,
    height: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: '#D1D1D1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2.5%',
    width: '96%',
    maxHeight: 200,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#62CCAD',
  },
});
