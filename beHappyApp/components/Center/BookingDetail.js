import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Moment from 'moment';

import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();

export default class BookingDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBookingState: false,
    };
    this.checkTime = this.checkTime.bind(this);
  }

  componentDidMount() {
    this.checkTime();
  }

  patchBookingCheck(token, isCheck) {
    const { id } = this.props.route.params.bookingData;

    fetch(ec2 + '/booking/check', {
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
            isBookingState: true,
          });
        }
      })
      .catch((error) => console.log('error', error));
  }

  checkTime() {
    const { date, time } = this.props.route.params.bookingData;
    const currentDate = Moment(new Date()).format('YYYY-MM-DD');
    const currentTime = Moment(new Date()).format('HH:MM');

    if (date > currentDate) {
      this.setState({
        isBookingState: true,
      });
    } else if (date === currentDate && time > currentTime) {
      this.setState({
        isBookingState: true,
      });
    }
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
    const { isBookingState } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.bucket}>
          <Text style={styles.section}>날{'    '}짜 :</Text>
          <Text style={styles.info}>{date}</Text>
        </View>
        <View style={styles.bucket}>
          <Text style={styles.section}>시{'    '}간 :</Text>
          <Text style={styles.info}>{time.slice(0, 5)}</Text>
        </View>
        <View style={styles.bucket}>
          <Text style={styles.section}>이{'    '}름 :</Text>
          <Text style={styles.info}>{name}</Text>
        </View>
        <View style={styles.bucket}>
          <Text style={styles.section}>연락처 :</Text>
          <Text style={styles.info}>{phone}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.section}>상담 이유</Text>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <Text style={styles.infoContent}>{content}</Text>
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
            disabled={bookingState !== 'booked' || isBookingState}
            style={
              bookingState !== 'booked' || isBookingState
                ? styles.deactivateButton
                : styles.Button
            }
            onPress={() => {
              this.patchBookingCheck(this.props.route.params.token, true);
            }}
          >
            <Text
              style={
                bookingState !== 'booked' || isBookingState
                  ? styles.deactivateButtonText
                  : { fontWeight: 'bold' }
              }
            >
              완료
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={bookingState !== 'booked' || isBookingState}
            style={
              bookingState !== 'booked' || isBookingState
                ? styles.deactivateButton
                : styles.Button
            }
            onPress={() => {
              this.patchBookingCheck(this.props.route.params.token, false);
            }}
          >
            <Text
              style={
                bookingState !== 'booked' || isBookingState
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
    padding: '4%',
    backgroundColor: 'white',
  },
  section: {
    paddingRight: 6,
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 20,
  },
  infoContent: {
    fontSize: 20,
    padding: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'lightgrey',
    height: 200,
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deactivateButton: {
    borderRadius: 20,
    paddingHorizontal: 17,
    margin: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deactivateButtonText: {
    color: 'lightgrey',
    fontWeight: 'bold',
  },
});
