import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '../components/Home';
import { controlLogin } from '../modules(reducers)/auth';
import { controlBasicUserInfo } from '../modules(reducers)/userInfo';
import { controlCenterInfo } from '../modules(reducers)/centerInfo';

const HomeContainer = ({
  authState,
  controlLogin,
  controlBasicUserInfo,
  controlCenterInfo,
  token,
}) => {
  return (
    <Home
      authState={authState}
      controlLogin={controlLogin}
      controlBasicUserInfo={controlBasicUserInfo}
      controlCenterInfo={controlCenterInfo}
      token={token}
    />
  );
};

const mapStateToProps = (state) => ({
  authState: state.handleLogin.authState,
  token: state.handleLogin.token,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlLogin,
      controlCenterInfo,
      controlBasicUserInfo,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
