import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchName from '../components/Map/SearchName';
import {
  controlCenterData,
  controlShowDetail,
  controlCenterTags,
  controlSpecialties,
} from '../modules(reducers)/currentOnMap';

const SearchNameContainer = ({
  controlCenterData,
  navigation,
  token,
  controlShowDetail,
  route,
  controlCenterTags,
  controlSpecialties,
}) => {
  return (
    <SearchName
      controlCenterData={controlCenterData}
      navigation={navigation}
      token={token}
      controlShowDetail={controlShowDetail}
      goSpecificLocationAfterSearch={route.params.goSpecificLocationAfterSearch}
      controlCenterTags={controlCenterTags}
      controlSpecialties={controlSpecialties}
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
      controlCenterTags,
      controlSpecialties,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchNameContainer);
