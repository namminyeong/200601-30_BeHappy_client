import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchGeo from '../components/Map/SearchGeo';
import { controlCenterData } from '../modules(reducers)/currentOnMap';

const SearchGeoContainer = ({ controlCenterData, navigation, token }) => {
  return (
    <SearchGeo
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
      controlCenterData,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchGeoContainer);
