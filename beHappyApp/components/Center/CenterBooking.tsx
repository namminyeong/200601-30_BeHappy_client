import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'

export default class CenterBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: this.findCurrentDate(),
      bookingdatas: [
        { date: '2020-06-10', time: '10:00-11:00', clientName: '테스트' },
        { date: '2020-06-10', time: '14:00-14:30', clientName: '아무개' },
        { date: '2020-06-06', time: '14:00-14:30', clientName: '홍길동' },
        { date: '2020-06-11', time: '15:00-15:30', clientName: '존 도' },
        { date: '2020-06-12', time: '14:00-14:30', clientName: '제인 도' },
        { date: '2020-06-13', time: '11:00-12:00', clientName: '강아지' },
        { date: '2020-06-12', time: '13:00-13:30', clientName: '고양이' },
        { date: '2020-06-10', time: '13:00-14:00', clientName: '백구' },
        { date: '2020-07-02', time: '10:00-11:30', clientName: '네로' },
        { date: '2020-06-10', time: '13:00-14:00', clientName: '호야' },
        { date: '2020-06-10', time: '13:00-14:00', clientName: '레오' },
        { date: '2020-06-10', time: '13:00-14:00', clientName: '바로' },
        { date: '2020-06-10', time: '13:00-14:00', clientName: '다올' },
      ]
    }
  }

  findCurrentDate() {
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
    // const { selectedStartDate } = this.state;
    // const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={styles.container}>
        {/* <FlatList
          data={this.state.bookingdatas}
          renderItem={({ item }) => {
            return (
              <View style={styles.bookingData}>
                <Text style={{ paddingRight: 20 }}>{item.time}</Text>
                <Text>{item.clientName}</Text>
              </View>
            )
          }}>
        </FlatList> */}
        <View>
          {console.log(this.props)}
          {this.state.bookingdatas
            .filter((data) => data.date === this.state.currentDate)
            .map((data, i) =>
              <View style={styles.bookingData}>
                <Text style={{ paddingRight: 20, alignItems: 'center' }}>{data.time}</Text>
                <Text>{data.clientName}</Text>
              </View>
            )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookingData: {
    //height: 60,
    flexDirection: 'row',
    //alignItems: 'center',
    padding: '4%',
    marginBottom: 4,
    borderColor: '#62CCAD',
    borderWidth: 2,

    backgroundColor: 'gray'
  }
})
