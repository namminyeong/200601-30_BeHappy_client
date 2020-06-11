import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Sign/LogIn';
import { controlLogin } from '../modules(reducers)/auth';

const LoginContainer = ({ controlLogin, navigation }) => {
  return (
    <Login status={true} controlLogin={controlLogin} navigation={navigation} />
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlLogin,
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(LoginContainer);
