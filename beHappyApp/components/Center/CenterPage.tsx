import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import BookingDetail from './BookingDetail'
import CenterBooking from './CenterBooking'

export default class CenterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: this.defaltDate(),
      bookingdatas: [
        { date: '2020-06-11', time: '10:00-11:00', clientName: '테스트' },
        { date: '2020-06-11', time: '14:00-14:30', clientName: '아무개' },
        { date: '2020-06-06', time: '14:00-14:30', clientName: '홍길동' },
        { date: '2020-06-10', time: '15:00-15:30', clientName: '존 도' },
        { date: '2020-06-12', time: '14:00-14:30', clientName: '제인 도' },
        { date: '2020-06-13', time: '11:00-12:00', clientName: '강아지' },
        { date: '2020-06-12', time: '13:00-13:30', clientName: '고양이' },
        { date: '2020-06-11', time: '17:30-18:00', clientName: '뚱땅' },
        { date: '2020-06-11', time: '13:00-14:00', clientName: '백구' },
        { date: '2020-07-02', time: '10:00-11:30', clientName: '네로' },
        { date: '2020-06-11', time: '09:30-10:00', clientName: '호야' },
        { date: '2020-06-11', time: '15:30-16:00', clientName: '레오' },
        { date: '2020-06-11', time: '16:00-17:00', clientName: '바로' },
      ]
    }
  }
  defaltDate() {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let date = new Date().getDate()

    if (month.toString().length === 1) {
      return year + '-0' + month + '-' + date
    } else {
      return year + '-' + month + '-' + date
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <Calendar
            current={new Date()}
            monthFormat={'yyyy MM'}
            onDayPress={(selectDate) => {
              this.setState({
                currentDate: selectDate.dateString
              })
            }}
          />

          <View style={styles.bookingListHeader}>
            <MaterialIcons name="access-time" size={24} style={{ color: '#62CCAD', paddingRight: 4, }} />
            <Text style={{ color: '#62CCAD', fontSize: 20, fontWeight: 'bold' }} >예약 리스트</Text>
            <Text style={{ color: '#62CCAD', fontSize: 14, paddingLeft: 10 }} >{this.state.currentDate}</Text>
          </View>
          {this.state.bookingdatas
            .filter((data) => data.date === this.state.currentDate)
            .sort((a, b) => {
              if (a.time > b.time) { return 1 }
              else { return -1 }
            })
            .map((data) =>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('BookingDetail') }} >
                <View style={styles.bookingData}>
                  <Text style={{ paddingRight: 20, alignItems: 'center' }}>{data.time}</Text>
                  <Text>{data.clientName}</Text>
                </View>
              </TouchableOpacity>
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
  }
})
