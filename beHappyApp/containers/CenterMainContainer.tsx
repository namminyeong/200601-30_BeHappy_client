import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CenterMain from '../components/Center/CenterMain';
import { controlLogin } from '../modules(reducers)/auth';

const CenterMainContainer = ({ controlLogin, token }) => {
  return <CenterMain controlLogin={controlLogin} token={token} />;
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
)(CenterMainContainer);
