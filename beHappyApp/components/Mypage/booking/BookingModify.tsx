import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  CheckBox,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import Moment from 'moment';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DeviceStorage from '../../../service/DeviceStorage';

import getEnvVars from '../../../environment';
const { ec2 } = getEnvVars();
const checkNumber = /^[0-9]+$/;

export default class BookingModify extends React.Component {
  constructor(props) {
    super(props);

    console.log('BookingModify 진입');
    console.log('props: ', this.props);
    this.state = {
      token: this.props.route.params.token,
      centerId: this.props.route.params.booking.center.id,
      bookingId: this.props.route.params.booking.id,
      date: this.props.route.params.booking.date,
      time: this.props.route.params.booking.time.slice(0, 5),
      name: this.props.route.params.booking.name,
      phone: this.props.route.params.booking.phone,
      content: this.props.route.params.booking.content,
      isSelectDate: true,
      isSelectTime: true,
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
      centerBookingData: [],
    };

    this.getCenterBooking = this.getCenterBooking.bind(this);
    this.updateBookingInfo = this.updateBookingInfo.bind(this);
    this.againSelectDate = this.againSelectDate.bind(this);
    this.againSelectTime = this.againSelectTime.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.blockTime = this.blockTime.bind(this);
    this.backTime = this.backTime.bind(this);
    this.checkUserInfo = this.checkUserInfo.bind(this);
  }

  getCenterBooking() {
    const { token, centerId, date, centerBookingData } = this.state;

    this.resetTime();

    fetch(ec2 + `/booking/center?centerId=${centerId}&date=${date}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return '';
      })
      .then((payload) => {
        this.setState({
          centerBookingData: payload,
        });
        this.blockTime(centerBookingData);
      })
      .then(() =>
        this.setState({
          isSelectDate: true,
          isSelectTime: false,
        })
      )
      .catch((error) => console.log('error', error));
  }

  updateBookingInfo() {
    const { token, bookingId, date, name, phone, content } = this.state;

    let time = this.state.time[0];

    console.log('updateBookingInfo 진입');
    this.resetTime();

    fetch(ec2 + '/booking', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookingId, date, time, name, phone, content }),
    })
      .then((res) => {
        if (res.status === 200) {
          alert('예약이 수정됐습니다.');
          this.props.navigation.navigate('MyBookingContainer');
        }
      })
      .catch((error) => console.log('error', error));
  }

  resetTime() {
    const { bookingTime } = this.state;
    bookingTime.map((data) => data[1] === false);
  }

  blockTime(centerBookingData) {
    const { bookingTime } = this.state;

    for (let i = 0; i < centerBookingData.length; i++) {
      bookingTime.map((time) =>
        time.includes(centerBookingData[i].time.slice(0, 5))
          ? (time[1] = true)
          : null
      );
    }
  }

  againSelectDate(time) {
    this.setState({
      isSelectDate: false,
      isSelectTime: false,
      date: '',
      time: '',
    });
    time === '' ? null : this.backTime(time);
  }

  againSelectTime(time) {
    this.setState({
      isSelectTime: false,
      time: '',
    });

    this.backTime(time);
  }

  changeTime(index) {
    let newState = this.state.bookingTime;
    let present = newState[index][1];
    newState[index][1] = !present;
    this.setState({
      bookingTime: newState,
    });
  }

  backTime(time) {
    const { bookingTime } = this.state;
    bookingTime.map((data) =>
      data.includes(time[0]) ? (data[1] = false) : data
    );
  }

  checkUserInfo() {
    const { name, phone, content } = this.state;

    name === '' || phone === '' || content === ''
      ? this.setState({
          isUserInfo: false,
        })
      : this.setState({
          isUserInfo: true,
        });
  }

  render() {
    const {
      isSelectDate,
      isSelectTime,
      date,
      time,
      name,
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
                <View>
                  <Calendar
                    current={new Date()}
                    minDate={Moment(
                      new Date().setDate(new Date().getDate() + 1)
                    ).format('YYYY-MM-DD')}
                    monthFormat={'yyyy MM'}
                    onDayPress={(selectDate) => {
                      this.setState({
                        date: selectDate.dateString,
                      });

                      DeviceStorage.loadJWT().then(() => {
                        this.getCenterBooking();
                      });
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MaterialCommunityIcons
                      name='alert-circle-outline'
                      size={14}
                      style={{ color: '#941818' }}
                    />
                    <Text style={{ margin: 6, color: '#941818' }}>
                      금일 ({Moment(new Date()).format('M월 D일')}) 예약은
                      불가능합니다.
                    </Text>
                  </View>
                </View>
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
                        this.againSelectDate(time);
                      }}
                    />
                  </View>
                </View>
              )}

              {isSelectDate && !isSelectTime ? (
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
                        this.againSelectTime(time);
                      }}
                    />
                  </View>
                  <View style={styles.userinfo}>
                    <View style={styles.textArea}>
                      <Text>이{'    '}름</Text>
                      <TextInput
                        style={styles.textBox}
                        value={name}
                        onChangeText={(name) => {
                          this.setState({ name: name });
                          this.checkUserInfo();
                        }}
                      />
                    </View>
                    <View style={styles.textArea}>
                      <Text>연락처</Text>
                      <TextInput
                        style={styles.textBox}
                        value={phone}
                        placeholder={` ' - '를 제외한 숫자를 입력해주세요.`}
                        onChangeText={(phone) => {
                          this.setState({ phone: phone });
                          this.checkUserInfo();
                        }}
                      />
                      {phone === '' || checkNumber.test(phone) ? null : (
                        <MaterialIcons
                          name='alert-circle-outline'
                          size={18}
                          style={{ color: '#941818', right: 20 }}
                        />
                      )}
                    </View>
                    {phone === '' || checkNumber.test(phone) ? null : (
                      <Text
                        style={{ color: '#941818', left: 60, fontSize: 10 }}
                      >
                        숫자만 입력해주세요.
                      </Text>
                    )}

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
                          phone:
                            phone.slice(0, 3) +
                            '-' +
                            phone.slice(3, 7) +
                            '-' +
                            phone.slice(7),
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
                  <MaterialCommunityIcons
                    name='alert-circle-outline'
                    size={24}
                  />
                  <View>
                    <Text style={{ marginTop: '4%' }}>
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
                  {name}
                </Text>
              </View>
              <View style={styles.selectBox}>
                <Text>
                  연락처{'    '}
                  {phone}
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
                  DeviceStorage.loadJWT().then(() => {
                    this.updateBookingInfo();
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
