import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CenterMain from '../../components/Center/Main/CenterMain';
import { controlLogin } from '../../modules(reducers)/auth';

const CenterMainContainer = ({
  controlLogin,
  token,
  CenterInfo,
  navigation,
}) => {
  return (
    <CenterMain
      controlLogin={controlLogin}
      token={token}
      CenterInfo={CenterInfo}
      navigation={navigation}
    />
  );
};

const mapStateToProps = (state) => ({
  token: state.handleLogin.token,
  CenterInfo: state.handleCenterInfo.CenterInfo,
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
