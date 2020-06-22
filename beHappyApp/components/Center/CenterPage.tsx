import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DeviceStorage from '../../service/DeviceStorage';

const centerId = 202; // ! merge 후 수정

export default class CenterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: Moment(new Date()).format('YYYY-MM-DD'),
      bookingDatas: [],
    };
    this.getCenterBooking = this.getCenterBooking.bind(this);
  }

  getCenterBooking(token) {
    const { currentDate } = this.state;

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
            monthFormat={'yyyy MM'}
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
                  <View style={styles.bookingData}>
                    <Text style={{ paddingRight: 20, alignItems: 'center' }}>
                      {data.time.slice(0, 5)}
                    </Text>
                    <Text>{data.name}</Text>
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
    marginTop: '6%',
    marginBottom: 0,
    marginLeft: '2%',
    marginRight: '2%',
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
    padding: '4%',
    marginBottom: 6,
    borderColor: '#62CCAD',
    borderWidth: 2,
  },
});
