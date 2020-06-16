import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  controlCenterData,
  controlCoordinate,
  controlBookmarkClicked,
} from '../modules(reducers)/currentOnMap';
import { controlBookmark } from '../modules(reducers)/userInfo';
import Map from '../components/Map/Map';

const MapContainer = ({
  counseling,
  psychiatric,
  navigation,
  controlCenterData,
  controlCoordinate,
  coordinate,
  token,
  controlBookmark,
  bookmark,
  bookmarkClicked,
  controlBookmarkClicked,
}) => {
  return (
    <Map
      counseling={counseling}
      psychiatric={psychiatric}
      navigation={navigation}
      controlCenterData={controlCenterData}
      controlCoordinate={controlCoordinate}
      coordinate={coordinate}
      token={token}
      controlBookmark={controlBookmark}
      bookmark={bookmark}
      bookmarkClicked={bookmarkClicked}
      controlBookmarkClicked={controlBookmarkClicked}
    />
  );
};

const mapStateToProps = (state) => ({
  counseling: state.handleCurrentOnMap.counseling,
  psychiatric: state.handleCurrentOnMap.psychiatric,
  coordinate: state.handleCurrentOnMap.coordinate,
  token: state.handleLogin.token,
  bookmark: state.handleUserInfo.bookmark,
  bookmarkClicked: state.handleCurrentOnMap.bookmarkClicked,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlCenterData,
      controlCoordinate,
      controlBookmark,
      controlBookmarkClicked,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
