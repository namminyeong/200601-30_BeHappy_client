import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchGeo from '../components/Map/SearchGeo';
import {
  controlCenterData,
  controlShowDetail,
  controlGeoModalShown,
} from '../modules(reducers)/currentOnMap';

const SearchGeoContainer = ({
  controlCenterData,
  goSpecificLocationAfterSearch,
  token,
  goBack,
  controlShowDetail,
  GeoModalShown,
  controlGeoModalShown,
}) => {
  return (
    <SearchGeo
      controlCenterData={controlCenterData}
      token={token}
      goSpecificLocationAfterSearch={goSpecificLocationAfterSearch}
      goBack={goBack}
      controlShowDetail={controlShowDetail}
      controlGeoModalShown={controlGeoModalShown}
      GeoModalShown={GeoModalShown}
    />
  );
};

const mapStateToProps = (state) => ({
  token: state.handleLogin.token,
  GeoModalShown: state.handleCurrentOnMap.GeoModalShown,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlCenterData,
      controlShowDetail,
      controlGeoModalShown,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchGeoContainer);
