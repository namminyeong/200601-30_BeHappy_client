import React, { Fragment } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';

import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();

import MyBookingList from './booking/MyBookingList';

class MyBookings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookings: [],
      isLoading: false,
    };

    this.getBookingList = this.getBookingList.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
  }

  componentDidMount() {
    this.handleLoading(true);
    this.getBookingList();
  }

  getBookingList() {
    console.log('MyBookings Get 실행');
    fetch(ec2 + '/booking', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      },
    })
      .then((res) => {
        if (res.status === 200 || res.status === 403) {
          return res.json();
        }
        return '';
      })
      .then((payload) => {
        console.log('payload: ', payload);
        if (typeof payload === 'object') {
          if (!payload.errorCode) {
            this.setState({
              bookings: payload,
            });
            this.handleLoading(false);
            console.log('bookings: ', this.state.bookings);
          } else if (payload.errorCode === 8) {
            console.log('there is no booking by userId');
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleLoading(status) {
    this.setState({
      isLoading: status,
    });
  }

  render() {
    const { bookings, isLoading } = this.state;
    return (
      <Fragment>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size='large' color='#0000ff' />
          </View>
        ) : (
          <ScrollView style={styles.container}>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <View style={styles.booking} key={index}>
                  <MyBookingList
                    token={this.props.token}
                    navigation={this.props.navigation}
                    booking={booking}
                  />
                </View>
              ))
            ) : (
              <Text>예약 목록이 없습니다.</Text>
            )}
          </ScrollView>
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  booking: {
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
});

export default MyBookings;
