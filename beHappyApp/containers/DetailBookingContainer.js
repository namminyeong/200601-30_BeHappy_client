import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DetailBooking from '../components/Map/details/DetailBooking';
import { controlmyBookings } from '../modules(reducers)/userInfo';

const DetailBookingContainer = ({
  token,
  navigation,
  controlmyBookings,
  myBookings,
  route,
}) => {
  return (
    <DetailBooking
      token={token}
      navigation={navigation}
      controlmyBookings={controlmyBookings}
      myBookings={myBookings}
      CenterInfo={route.params}
    />
  );
};

const mapStateToProps = (state) => ({
  token: state.handleLogin.token,
  myBookings: state.handleUserInfo.myBookings,
  CenterInfo: state.handleCenterInfo.CenterInfo,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlmyBookings,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailBookingContainer);
