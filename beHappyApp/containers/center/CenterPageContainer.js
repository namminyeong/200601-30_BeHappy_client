import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CenterPage from '../../components/Center/CenterPage';
import { controlLogin } from '../../modules(reducers)/auth';

const CenterPageContainer = ({
  controlLogin,
  token,
  CenterInfo,
  navigation,
}) => {
  return (
    <CenterPage
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
)(CenterPageContainer);
