import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchGeo from '../components/Map/SearchGeo';
import {
  controlCenterData,
  controlShowDetail,
} from '../modules(reducers)/currentOnMap';

const SearchGeoContainer = ({
  controlCenterData,
  goSpecificLocationAfterSearch,
  token,
  goBack,
  controlShowDetail,
}) => {
  return (
    <SearchGeo
      controlCenterData={controlCenterData}
      token={token}
      goSpecificLocationAfterSearch={goSpecificLocationAfterSearch}
      goBack={goBack}
      controlShowDetail={controlShowDetail}
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
)(SearchGeoContainer);
