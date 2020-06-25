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
      isLoading: false,
    };

    this.deleteBookingState = this.deleteBookingState.bind(this);
    this.modifyBookingState = this.modifyBookingState.bind(this);
    this.getBookingList = this.getBookingList.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.changeBookingState = this.changeBookingState.bind(this);
  }

  componentDidMount() {
    this.handleLoading(true);
    this.getBookingList();
  }

  deleteBookingState(index) {
    let newState = Object.assign([], this.props.myBookings);
    newState.splice(index, 1);
    this.props.controlmyBookings(newState);
  }

  modifyBookingState(index, booking) {
    let newState = Object.assign([], this.props.myBookings);
    newState[index].date = booking.date;
    newState[index].time = booking.time;
    newState[index].name = booking.name;
    newState[index].phone = booking.phone;
    newState[index].content = booking.content;
    this.props.controlmyBookings(newState);
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
      .then((data) => {
        if (typeof data === 'object') {
          if (!data.errorCode) {
            let sortData = data
              .sort((a, b) => a.time < b.time)
              .sort((a, b) => a.date < b.date);

            this.props.controlmyBookings(sortData);
          }
          this.handleLoading(false);
        }
      })
      .catch((error) => {
        `console`.log(error);
      });
  }

  handleLoading(status) {
    this.setState({
      isLoading: status,
    });
  }

  changeBookingState(index) {
    let newState = Object.assign([], this.props.myBookings);
    newState[index].bookingState = 'reviewed';
    this.props.controlmyBookings(newState);
  }

  render() {
    const { isLoading } = this.state;

    return (
      <Fragment>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size='large' color='#0000ff' />
          </View>
        ) : (
          <View style={styles.container}>
            {this.props.myBookings.length > 0 ? (
              <ScrollView>
                {this.props.myBookings.map((booking, index) => (
                  <MyBookingList
                    key={index}
                    token={this.props.token}
                    navigation={this.props.navigation}
                    booking={booking}
                    deleteBookingState={this.deleteBookingState}
                    modifyBookingState={this.modifyBookingState}
                    index={index}
                    controlCenterData={this.props.controlCenterData}
                    controlBookmarkClicked={this.props.controlBookmarkClicked}
                    controlCoordinate={this.props.controlCoordinate}
                    changeBookingState={this.changeBookingState}
                  />
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
  noList: {
    top: '45%',
    alignSelf: 'center',
    fontSize: 20,
  },
});

export default MyBookings;
