import React from 'react';
import { connect } from 'react-redux';

import MyBooking from '../components/Mypage/MyBookings';

const MyBookingContainer = ({ token, navigation }) => {
  return <MyBooking token={token} navigation={navigation} />;
};

const mapStateToProps = (state) => ({
  token: state.handleLogin.token,
});

export default connect(mapStateToProps)(MyBookingContainer);
