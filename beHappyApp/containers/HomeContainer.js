import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '../components/Home';
import { controlLogin } from '../modules(reducers)/auth';
import { controlCenterInfo } from '../modules(reducers)/centerInfo';

const HomeContainer = ({
  authState,
  controlLogin,
  controlCenterInfo,
  token,
}) => {
  return (
    <Home
      authState={authState}
      controlLogin={controlLogin}
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
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
