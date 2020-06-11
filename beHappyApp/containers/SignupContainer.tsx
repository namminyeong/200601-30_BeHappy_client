import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Signup from '../components/Sign/SignUp';

import {
  controlCoordinate,
  controlCenterData,
} from '../modules(reducers)/currentOnMap2';

const SignupContainer = ({
  coordinate,
  controlCoordinate,
  controlCenterData,
  navigation,
}) => {
  return (
    <Signup
      coordinate={coordinate}
      controlCoordinate={controlCoordinate}
      controlCenterData={controlCenterData}
      navigation={navigation}
    />
  );
};

const mapStateToProps = (state) => ({
  coordinate: state.handleCurrentOnMap.coordinate,
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
)(SignupContainer);
