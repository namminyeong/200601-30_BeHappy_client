import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MyBooking from '../components/Mypage/MyBookings';
import {
  controlCenterData,
  controlBookmarkClicked,
  controlCoordinate,
} from '../modules(reducers)/currentOnMap';
import { controlmyBookings } from '../modules(reducers)/userInfo';

const MyBookingContainer = ({
  token,
  navigation,
  controlCenterData,
  controlBookmarkClicked,
  controlCoordinate,
  controlmyBookings,
  myBookings,
}) => {
  return (
    <MyBooking
      token={token}
      navigation={navigation}
      controlCenterData={controlCenterData}
      controlBookmarkClicked={controlBookmarkClicked}
      controlCoordinate={controlCoordinate}
      controlmyBookings={controlmyBookings}
      myBookings={myBookings}
    />
  );
};

const mapStateToProps = (state) => ({
  token: state.handleLogin.token,
  myBookings: state.handleUserInfo.myBookings,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlCenterData,
      controlBookmarkClicked,
      controlCoordinate,
      controlmyBookings,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyBookingContainer);
