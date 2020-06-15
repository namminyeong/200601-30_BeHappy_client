import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  controlCenterData,
  controlCoordinate,
} from '../modules(reducers)/currentOnMap';
import {
  controlBookmarkId,
  controlBookmark,
} from '../modules(reducers)/userInfo';
import Map from '../components/Map/Map';

const MapContainer = ({
  counseling,
  psychiatric,
  navigation,
  controlCenterData,
  controlCoordinate,
  coordinate,
  token,
  bookmarkId,
  controlBookmarkId,
  controlBookmark,
  bookmark,
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
      bookmarkId={bookmarkId}
      controlBookmarkId={controlBookmarkId}
      controlBookmark={controlBookmark}
      bookmark={bookmark}
    />
  );
};

const mapStateToProps = (state) => ({
  counseling: state.handleCurrentOnMap.counseling,
  psychiatric: state.handleCurrentOnMap.psychiatric,
  coordinate: state.handleCurrentOnMap.coordinate,
  token: state.handleLogin.token,
  bookmarkId: state.handleUserInfo.bookmarkId,
  bookmark: state.handleUserInfo.bookmark,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlCenterData,
      controlCoordinate,
      controlBookmarkId,
      controlBookmark,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
