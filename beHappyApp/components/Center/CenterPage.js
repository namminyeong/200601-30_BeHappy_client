import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();

export default class CenterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      centerId: this.props.CenterInfo.id,
      currentDate: Moment(new Date()).format('YYYY-MM-DD'),
      bookingDatas: [],
    };
    this.getCenterBooking = this.getCenterBooking.bind(this);
  }

  componentDidMount() {
    this.getCenterBooking(this.state.currentDate);
  }

  getCenterBooking(date) {
    const { centerId } = this.state;
    fetch(ec2 + `/booking/center?centerId=${centerId}&date=${date}`, {
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
        this.setState({
          bookingDatas: payload,
        });
      })
      .catch((error) => console.log('error', error));
  }

  render() {
    const { currentDate, bookingDatas } = this.state;
    const markedSelectDate = {
      [currentDate]: {
        selected: true,
        selectedColor: 'skyblue',
      },
    };

    return (
      <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <Calendar
            current={new Date()}
            monthFormat={'yyyy-MM'}
            markedDates={markedSelectDate}
            onDayPress={(selectDate) => {
              this.setState({
                currentDate: selectDate.dateString,
              });
              this.getCenterBooking(selectDate.dateString);
            }}
          />

          <View style={styles.bookingListHeader}>
            <MaterialIcons
              name='access-time'
              size={24}
              style={{ paddingRight: 4 }}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              예약 리스트
            </Text>
            <Text style={{ color: '#62CCAD', fontSize: 14, paddingLeft: 10 }}>
              {currentDate}
            </Text>
          </View>
          {bookingDatas.length === 0 ? (
            <Text
              style={{ textAlign: 'center', paddingTop: 80, color: '#D1D1D1' }}
            >
              현재 날짜는 예약이 없습니다
            </Text>
          ) : (
            bookingDatas
              .sort((a, b) => {
                return a.time > b.time ? 1 : -1;
              })
              .map((booking, index) => (
                <TouchableOpacity
                  key={'booking' + index}
                  onPress={() => {
                    this.props.navigation.navigate('BookingDetail', {
                      bookingData: booking,
                      token: this.props.token,
                    });
                  }}
                >
                  <View
                    style={
                      booking.bookingState === 'booked'
                        ? styles.bookingData
                        : styles.bookedData
                    }
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ paddingRight: 20 }}>
                        {booking.time.slice(0, 5)}
                      </Text>
                      <Text>{booking.name}</Text>
                    </View>
                    <Text
                      style={
                        booking.bookingState === 'booked'
                          ? styles.onGoing
                          : styles.finished
                      }
                    >
                      {booking.bookingState === 'booked'
                        ? '예약중'
                        : booking.bookingState === 'used'
                        ? '진료완료'
                        : booking.bookingState === 'notUsed'
                        ? '진료미완료'
                        : booking.bookingState === 'reviewed'
                        ? '리뷰완료'
                        : null}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '6%',
    paddingBottom: 0,
    paddingLeft: '2%',
    paddingRight: '2%',
    backgroundColor: '#FFFFFF',
  },
  bookingListHeader: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '4%',
    marginBottom: 6,
    borderColor: '#62CCAD',
    borderWidth: 2,
  },
  bookedData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '4%',
    marginBottom: 6,
    borderColor: '#D1D1D1',
    borderWidth: 2,
  },
  onGoing: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 20,
    backgroundColor: '#62CCAD',
    borderRadius: 8,
    color: '#FFFFFF',
  },
  finished: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 20,
    backgroundColor: '#D1D1D1',
    borderRadius: 8,
    color: '#FFFFFF',
  },
});
