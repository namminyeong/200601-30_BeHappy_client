import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GeoModal from '../components/Map/GeoModal';
import { controlGeoModalShown } from '../modules(reducers)/currentOnMap';

const GeoModalContainer = ({ controlGeoModalShown, GeoModalShown }) => {
  return <GeoModal controlGeoModalShown={controlGeoModalShown} />;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlGeoModalShown,
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(GeoModalContainer);
