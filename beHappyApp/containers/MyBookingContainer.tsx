import React from 'react';
import { connect } from 'react-redux';

import MyBooking from '../components/Mypage/MyBookings';
// import MyBookingReview from '../components/Mypage/booking/BookingReview';

const MyBookingContainer = ({ token, navigation }) => {
  console.log('MyBookingContainer 진입');
  console.log('token: ', token);
  console.log('navigation: ', navigation);
  return <MyBooking token={token} navigation={navigation} />;
  // return <MyBookingReview token={token} navigation={navigation} />;
};

const mapStateToProps = (state) => ({
  token: state.handleLogin.token,
});

export default connect(mapStateToProps)(MyBookingContainer);
