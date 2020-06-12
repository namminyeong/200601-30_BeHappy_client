import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '../components/Home';
import { controlLogin } from '../modules(reducers)/auth';

const HomeContainer = ({ authState, controlLogin, navigation }) => {
  return (
    <Home
      authState={authState}
      controlLogin={controlLogin}
      navigation={navigation}
    />
  );
};

const mapStateToProps = (state) => ({
  authState: state.handleLogin.authState,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlLogin,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
