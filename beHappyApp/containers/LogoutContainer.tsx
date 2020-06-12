import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Logout from '../components/Mypage/Logout';
import { controlLogin } from '../modules(reducers)/auth';

const LogoutContainer = ({ controlLogin, token, navigation }) => {
  return (
    <Logout controlLogin={controlLogin} token={token} navigation={navigation} />
  );
};

const mapStateToProps = (state) => ({
  token: state.handleLogin.token,
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
)(LogoutContainer);
