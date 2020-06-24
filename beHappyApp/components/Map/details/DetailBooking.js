import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  CheckBox,
  Modal,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Moment from 'moment';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import getEnvVars from '../../../environment';
const { ec2 } = getEnvVars();

import CompleteModal from '../../../Modal/CompleteModal';

const checkNumber = /^[0-9]{10,11}$/;

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
      showAgreeModal: false,
      isAgree: false,
      showCompleteModal: false,
      showModalText: '',
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
    };
    this.againSelectDate = this.againSelectDate.bind(this);
    this.againSelectTime = this.againSelectTime.bind(this);
    this.completeBooking = this.completeBooking.bind(this);
    this.postBooking = this.postBooking.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.getCenterBooking = this.getCenterBooking.bind(this);
    this.blockTime = this.blockTime.bind(this);
    this.resetTime = this.resetTime.bind(this);
    this.backTime = this.backTime.bind(this);
    this.checkUserInfo = this.checkUserInfo.bind(this);
    this.getUserBasicInfo = this.getUserBasicInfo.bind(this);
    this.addBookingState = this.addBookingState.bind(this);
  }

  getCenterBooking(selectDate) {
    this.setState({
      date: selectDate,
    });

    let url =
      ec2 +
      '/booking/center?centerId=' +
      this.props.CenterInfo.id +
      '&date=' +
      selectDate;

    this.resetTime();
    fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return '';
      })
      .then((payload) => {
        console.log('getCenterBooking', payload);
        let centerBookingData = payload === 'string' ? [] : payload;
        this.blockTime(centerBookingData);
      })
      .then(() =>
        this.setState({
          isSelectDate: true,
          isSelectTime: false,
        })
      )
      .catch((error) => ('error', error));
  }

  postBooking(token) {
    const { date, time, username, phone, content } = this.state;
    let url = ec2 + '/booking';

    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        centerId: this.props.CenterInfo.id,
        date,
        time: time + ':00',
        name: username,
        phone: phone.split('-').join(''),
        content,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            showCompleteModal: true,
            showModalText: '예약이 완료되었습니다',
          });
          this.addBookingState();
        }
      })
      .catch((error) => console.log('error', error));
  }

  getUserBasicInfo(token) {
    let url = ec2 + '/user';

    fetch(url, {
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
          username: payload.nickname,
          phone: payload.phone,
        });
        return;
      });
  }

  addBookingState() {
    const { date, time, username, phone, content } = this.state;

    let newState = Object.assign([], this.props.myBookings);
    let newBooking = {
      date,
      time,
      name: username,
      phone,
      content,
      bookingState: 'booked',
    };
    let center = {
      centerName: this.props.CenterInfo.centerName,
      id: this.props.CenterInfo.id,
    };
    newBooking.center = center;
    newState.push(newBooking);
    let sortData = newState.sort((a, b) => a.date < b.date);

    this.props.controlmyBookings(sortData);
    this.completeBooking();
  }

  againSelectDate(time) {
    this.setState({
      isSelectDate: false,
      isSelectTime: false,
      date: '',
      time: '',
      username: '',
      phone: '',
      content: '',
    });
    time === '' ? null : this.backTime(time);
  }

  againSelectTime(time) {
    this.setState({
      isSelectTime: false,
      time: '',
      username: '',
      phone: '',
      content: '',
    });
    this.backTime(time);
  }

  completeBooking() {
    this.setState({
      isSelectDate: false,
      isSelectTime: false,
      date: '',
      time: '',
      username: '',
      phone: '',
      content: '',
      showAgreeModal: false,
      isAgree: false,
    });
    setTimeout(() => {
      this.setState({ showCompleteModal: false });
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

  resetTime() {
    const { bookingTime } = this.state;
    bookingTime.map((data) => (data[1] = false));
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
      : checkNumber.test(phone)
      ? this.setState({
          isUserInfo: true,
        })
      : this.setState({
          isUserInfo: false,
        });
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
      showAgreeModal,
      isAgree,
      bookingTime,
      showCompleteModal,
      showModalText,
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
                    monthFormat={'yyyy-MM'}
                    onDayPress={(selectDate) => {
                      this.getCenterBooking(selectDate.dateString);
                    }}
                  />
                  <View
                    style={{
                      marginTop: 5,
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
                      당일 ({Moment(new Date()).format('M월 D일')}) 예약은
                      불가능합니다
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity
                    style={styles.selectBox}
                    onPress={() => {
                      this.againSelectDate(time);
                    }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold' }}>
                        날{'    '}짜{'    '}
                      </Text>
                      <Text>{date}</Text>
                    </View>
                    <AntDesign
                      name='calendar'
                      size={25}
                      style={{ paddingRight: 4 }}
                    />
                  </TouchableOpacity>
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
                        this.getUserBasicInfo(this.props.token);
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
                  <TouchableOpacity
                    style={styles.selectBox}
                    onPress={() => {
                      this.againSelectTime(time);
                    }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold' }}>
                        시{'    '}간{'    '}
                      </Text>
                      <Text>{time}</Text>
                    </View>
                    <MaterialIcons
                      name='access-time'
                      size={25}
                      style={{ paddingRight: 4 }}
                    />
                  </TouchableOpacity>
                  <View style={styles.userinfo}>
                    <View style={styles.textArea}>
                      <Text style={{ fontWeight: 'bold' }}>이{'    '}름</Text>
                      <TextInput
                        style={styles.textBox}
                        value={username}
                        onChangeText={(username) => {
                          this.setState({ username });
                          this.checkUserInfo();
                        }}
                      />
                    </View>
                    <View style={styles.textArea}>
                      <Text style={{ fontWeight: 'bold' }}>연락처</Text>
                      <TextInput
                        style={styles.textBox}
                        value={phone}
                        placeholder={` ' - '를 제외한 숫자를 입력해주세요`}
                        onChangeText={(phone) => {
                          this.setState({ phone });
                          this.checkUserInfo();
                        }}
                      />
                      {phone === '' || checkNumber.test(phone) ? null : (
                        <MaterialCommunityIcons
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
                        숫자만 입력해주세요
                      </Text>
                    )}
                    <View
                      style={{ marginTop: 6, marginBottom: 6, marginLeft: 4 }}
                    >
                      <Text style={{ marginBottom: 8, fontWeight: 'bold' }}>
                        상담 이유
                      </Text>
                      <TextInput
                        style={styles.textBoxContent}
                        value={content}
                        multiline={true}
                        onChangeText={(content) => {
                          this.setState({ content });
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
                          showAgreeModal: true,
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
                            color: !isUserInfo ? 'lightgrey' : '#000000',
                          }}
                        />
                        <Text
                          style={{
                            color: !isUserInfo ? 'lightgrey' : '#000000',
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
              <Modal
                animationType='none'
                transparent={true}
                visible={showAgreeModal}
              >
                <View style={styles.centeredView}>
                  <View style={styles.agreeModal}>
                    <MaterialCommunityIcons
                      name='alert-circle-outline'
                      size={24}
                    />
                    <View>
                      <Text style={{ marginTop: '4%' }}>
                        개인정보 수집과 제공에 동의합니다.
                      </Text>
                      <Text style={{ marginTop: 4 }}>
                        잦은 예약 변경과 취소시 이후 예약이 제한 될 수 있습니다.
                      </Text>
                      <Text style={{ color: '#941818' }}>
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
                          this.setState({
                            phone:
                              phone.slice(0, 3) +
                              '-' +
                              phone.slice(3, 7) +
                              '-' +
                              phone.slice(7),
                            isAgree: true,
                            showAgreeModal: false,
                          })
                        }
                      />
                      <Text>확인</Text>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          ) : (
            <View>
              <View style={styles.lastBox}>
                <Text style={{ fontWeight: 'bold' }}>
                  날{'    '}짜{'    '}
                </Text>
                <Text>{date}</Text>
              </View>
              <View style={styles.lastBox}>
                <Text style={{ fontWeight: 'bold' }}>
                  시{'    '}간{'    '}
                </Text>
                <Text>{time}</Text>
              </View>
              <View style={styles.lastBox}>
                <Text style={{ fontWeight: 'bold' }}>
                  이{'    '}름{'    '}
                </Text>
                <Text>{username}</Text>
              </View>
              <View style={styles.lastBox}>
                <Text style={{ fontWeight: 'bold' }}>연락처{'    '}</Text>
                <Text>{phone}</Text>
              </View>
              <View style={styles.userinfo}>
                <Text style={{ marginBottom: 6, fontWeight: 'bold' }}>
                  상담 이유
                </Text>
                <Text>{content}</Text>
              </View>
              <TouchableOpacity
                disabled={!isAgree}
                style={{ alignItems: 'center' }}
                onPress={() => {
                  this.postBooking(this.props.token);
                }}
              >
                <View style={styles.completeButton}>
                  <Entypo name='check' size={24} />
                  <Text style={{ fontSize: 16 }}>예약 완료</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        <Modal
          animationType='none'
          transparent={true}
          visible={showCompleteModal}
        >
          <CompleteModal showModalText={showModalText} />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  time: {
    marginTop: '2%',
    marginLeft: '2%',
    marginRight: '2%',
    paddingBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
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
    marginVertical: 9,
    marginHorizontal: 10,
    padding: 3,
    paddingHorizontal: 13,
    backgroundColor: '#62CCAD',
    color: '#FFFFFF',
    fontSize: 18,
    borderRadius: 10,
  },
  notblocked: {
    marginVertical: 9,
    marginHorizontal: 10,
    padding: 3,
    paddingHorizontal: 13,
    backgroundColor: '#D1D1D1',
    color: '#FFFFFF',
    fontSize: 18,
    borderRadius: 10,
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
    height: 100,
    padding: 4,
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
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastBox: {
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
  },

  centeredView: {
    flex: 1,
    top: '33%',
    alignItems: 'center',
    marginTop: 22,
  },
  agreeModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    maxHeight: 200,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderRadius: 5,
    borderColor: '#62CCAD',
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
  modalText: {
    fontSize: 17,
    textAlign: 'center',
  },
});
