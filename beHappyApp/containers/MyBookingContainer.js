import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MyBooking from '../components/Mypage/MyBookings';
import {
  controlCenterData,
  controlBookmarkClicked,
  controlCoordinate,
} from '../modules(reducers)/currentOnMap';

const MyBookingContainer = ({
  token,
  navigation,
  controlCenterData,
  controlBookmarkClicked,
  controlCoordinate,
}) => {
  return (
    <MyBooking
      token={token}
      navigation={navigation}
      controlCenterData={controlCenterData}
      controlBookmarkClicked={controlBookmarkClicked}
      controlCoordinate={controlCoordinate}
    />
  );
};

const mapStateToProps = (state) => ({
  token: state.handleLogin.token,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlCenterData,
      controlBookmarkClicked,
      controlCoordinate,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyBookingContainer);
