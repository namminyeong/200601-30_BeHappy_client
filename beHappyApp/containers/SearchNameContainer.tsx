import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchName from '../components/Map/SearchName';
import {
  controlCenterData,
  controlShowDetail,
} from '../modules(reducers)/currentOnMap';

const SearchNameContainer = ({
  controlCenterData,
  navigation,
  token,
  controlShowDetail,
  route,
}) => {
  return (
    <SearchName
      controlCenterData={controlCenterData}
      navigation={navigation}
      token={token}
      controlShowDetail={controlShowDetail}
      goSpecificLocationAfterSearch={route.params.goSpecificLocationAfterSearch}
    />
  );
};

const mapStateToProps = (state) => ({
  token: state.handleLogin.token,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlCenterData,
      controlShowDetail,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchNameContainer);
