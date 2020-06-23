import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  controlSpecialties,
  controlCenterTags,
  controlShowDetail,
} from '../modules(reducers)/currentOnMap';
import Filter from '../components/Map/Filter';

const FilterContainer = ({
  specialties,
  centerTags,
  controlCenterTags,
  controlSpecialties,
  controlShowDetail,
  navigation,
}) => {
  return (
    <Filter
      controlCenterTags={controlCenterTags}
      controlSpecialties={controlSpecialties}
      specialties={specialties}
      centerTags={centerTags}
      controlShowDetail={controlShowDetail}
      navigation={navigation}
    />
  );
};

const mapStateToProps = (state) => ({
  specialties: state.handleCurrentOnMap.specialties,
  centerTags: state.handleCurrentOnMap.centerTags,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlSpecialties,
      controlCenterTags,
      controlShowDetail,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterContainer);
