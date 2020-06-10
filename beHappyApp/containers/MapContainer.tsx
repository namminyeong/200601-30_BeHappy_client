import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  controlCenterData,
  controlCoordinate,
} from '../modules(reducers)/currentOnMap';
import Map from '../components/Map/Map';

const MapContainer = ({
  counseling,
  psychiatric,
  navigation,
  controlCenterData,
  controlCoordinate,
  coordinate,
  token,
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
    />
  );
};

const mapStateToProps = (state) => ({
  counseling: state.handleCurrentOnMap.counseling,
  psychiatric: state.handleCurrentOnMap.psychiatric,
  coordinate: state.handleCurrentOnMap.coordinate,
  token: state.handleLogin.token,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlCenterData,
      controlCoordinate,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
