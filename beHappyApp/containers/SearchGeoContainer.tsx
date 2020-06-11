import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchGeo from '../components/Map/SearchGeo';
import {
  controlCoordinate,
  controlCenterData,
} from '../modules(reducers)/currentOnMap';

const SearchGeoContainer = ({
  controlCoordinate,
  controlCenterData,
  navigation,
  token,
}) => {
  return (
    <SearchGeo
      controlCoordinate={controlCoordinate}
      controlCenterData={controlCenterData}
      navigation={navigation}
      token={token}
    />
  );
};

const mapStateToProps = (state) => ({
  token: state.handleLogin.token,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlCoordinate,
      controlCenterData,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchGeoContainer);
