import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchName from '../components/Map/SearchName';
import {
  controlCoordinate,
  controlCenterData,
} from '../modules(reducers)/currentOnMap';

const SearchNameContainer = ({
  controlCoordinate,
  controlCenterData,
  navigation,
  token,
}) => {
  return (
    <SearchName
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
)(SearchNameContainer);
