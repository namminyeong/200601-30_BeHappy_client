import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Sign/LogIn';
import { controlLogin } from '../modules(reducers)/auth';
import { controlBasicUserInfo } from '../modules(reducers)/userInfo';

const LoginContainer = ({ controlLogin, navigation, controlBasicUserInfo }) => {
  return <Login controlLogin={controlLogin} navigation={navigation} controlBasicUserInfo={controlBasicUserInfo} />;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlLogin,
      controlBasicUserInfo,
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(LoginContainer);
