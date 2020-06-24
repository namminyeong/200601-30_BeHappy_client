import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Sign/LogIn';
import { controlLogin } from '../modules(reducers)/auth';
import { controlBasicUserInfo } from '../modules(reducers)/userInfo';
import { controlCenterInfo } from '../modules(reducers)/centerInfo';

const LoginContainer = ({
  controlLogin,
  navigation,
  controlBasicUserInfo,
  controlCenterInfo,
}) => {
  return (
    <Login
      controlLogin={controlLogin}
      navigation={navigation}
      controlBasicUserInfo={controlBasicUserInfo}
      controlCenterInfo={controlCenterInfo}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlLogin,
      controlBasicUserInfo,
      controlCenterInfo,
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(LoginContainer);
