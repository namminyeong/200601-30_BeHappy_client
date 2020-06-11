import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Signup from '../components/Sign/SignUp';

import {
  controlCoordinate,
  controlCenterData,
} from '../modules(reducers)/currentOnMap';

const SignupContainer = ({ controlCoordinate, navigation }) => {
  return (
    <Signup controlCoordinate={controlCoordinate} navigation={navigation} />
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
