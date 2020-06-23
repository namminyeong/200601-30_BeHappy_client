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

import DeviceStorage from '../../service/DeviceStorage';

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
    DeviceStorage.loadJWT().then((value) => {
      this.getCenterBooking(value);
    });
  }

  componentDidUpdate() {
    DeviceStorage.loadJWT().then((value) => {
      this.getCenterBooking(value);
    });
  }

  getCenterBooking(token) {
    const { currentDate, centerId } = this.state;

    fetch(
      `http://13.209.16.103:4000/booking/center?centerId=${centerId}&date=${currentDate}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
              DeviceStorage.loadJWT().then((value) => {
                this.getCenterBooking(value);
              });
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
              현재 날짜는 예약이 없습니다.
            </Text>
          ) : (
            bookingDatas
              .sort((a, b) => {
                return a.time > b.time ? 1 : -1;
              })
              .map((data, index) => (
                <TouchableOpacity
                  key={'bookingData' + index}
                  onPress={() => {
                    this.props.navigation.navigate('BookingDetail', {
                      bookingData: data,
                    });
                  }}
                >
                  <View
                    style={
                      data.bookingState === 'booked'
                        ? styles.bookingData
                        : styles.bookedData
                    }
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ paddingRight: 20 }}>
                        {data.time.slice(0, 5)}
                      </Text>
                      <Text>{data.name}</Text>
                    </View>
                    <Text
                      style={
                        data.bookingState === 'booked'
                          ? styles.booking
                          : styles.booked
                      }
                    >
                      {data.bookingState === 'booked'
                        ? '예약중'
                        : data.bookingState === 'used'
                        ? '완료'
                        : data.bookingState === 'notUsed'
                        ? '미완료'
                        : data.bookingState === 'reviewed'
                        ? '리뷰'
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
  booking: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 20,
    backgroundColor: '#62CCAD',
    borderRadius: 8,
    color: '#FFFFFF',
  },
  booked: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 20,
    backgroundColor: '#D1D1D1',
    borderRadius: 8,
    color: '#FFFFFF',
  },
});
