import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import DeviceStorage from '../../service/DeviceStorage';

export default class BookingDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBookingState: false,
    };
  }

  patchBookingCheck(token, isCheck) {
    const { id } = this.props.route.params.bookingData;

    fetch('http://13.209.16.103:4000/booking/check', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookingId: id,
        isCheck: isCheck,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            currentBookingState: true,
          });
        }
      })
      .catch((error) => console.log('error', error));
  }

  render() {
    const {
      date,
      time,
      name,
      phone,
      content,
      bookingState,
    } = this.props.route.params.bookingData;
    const { currentBookingState } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.bucket}>
          <Text style={styles.section}>날짜</Text>
          <Text>{date}</Text>
        </View>
        <View style={styles.bucket}>
          <Text style={styles.section}>시간</Text>
          <Text>{time.slice(0, 5)}</Text>
        </View>
        <View style={styles.bucket}>
          <Text style={styles.section}>이름</Text>
          <Text>{name}</Text>
        </View>
        <View style={styles.bucket}>
          <Text style={styles.section}>연락처</Text>
          <Text>{phone}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.section}>상담 이유</Text>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <Text style={{ padding: 10 }}>{content}</Text>
          </ScrollView>
        </View>
        <View
          style={{
            paddingTop: 10,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            disabled={bookingState !== 'booked' || currentBookingState}
            style={
              bookingState !== 'booked' || currentBookingState
                ? styles.deactivateButton
                : styles.Button
            }
            onPress={() => {
              DeviceStorage.loadJWT().then((value) => {
                this.patchBookingCheck(value, true);
              });
            }}
          >
            <Text
              style={
                bookingState !== 'booked' || currentBookingState
                  ? styles.deactivateButtonText
                  : { fontWeight: 'bold' }
              }
            >
              완료
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={bookingState !== 'booked' || currentBookingState}
            style={
              bookingState !== 'booked' || currentBookingState
                ? styles.deactivateButton
                : styles.Button
            }
            onPress={() => {
              DeviceStorage.loadJWT().then((value) => {
                this.patchBookingCheck(value, false);
              });
            }}
          >
            <Text
              style={
                bookingState !== 'booked' || currentBookingState
                  ? styles.deactivateButtonText
                  : { fontWeight: 'bold' }
              }
            >
              미완료
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '4%',
  },
  section: {
    color: '#62CCAD',
    paddingRight: 20,
    fontWeight: 'bold',
  },
  bucket: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  content: {
    paddingTop: 10,
    height: '60%',
  },
  Button: {
    borderRadius: 20,
    paddingHorizontal: 17,
    margin: 10,
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 15,
    marginBottom: 20,
    width: 80,
    height: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deactivateButton: {
    borderRadius: 20,
    paddingHorizontal: 17,
    margin: 10,
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 15,
    marginBottom: 20,
    width: 80,
    height: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: '#D1D1D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deactivateButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
