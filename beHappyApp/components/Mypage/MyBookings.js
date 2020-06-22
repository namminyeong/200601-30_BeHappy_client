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
        if (typeof payload === 'object') {
          if (!payload.errorCode) {
            this.setState({
              bookings: payload,
            });
          }
          this.handleLoading(false);
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
          <View style={styles.container}>
            {bookings.length > 0 ? (
              <ScrollView>
                {bookings.map((booking, index) => (
                  <View style={styles.booking} key={index}>
                    <MyBookingList
                      token={this.props.token}
                      navigation={this.props.navigation}
                      booking={booking}
                    />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.noList}>예약 목록이 없습니다</Text>
            )}
          </View>
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
  noList: {
    top: '45%',
    alignSelf: 'center',
    fontSize: 20,
  },
});

export default MyBookings;
