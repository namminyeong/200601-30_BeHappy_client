import React from 'react';
import { connect } from 'react-redux';

import Map from '../components/Map/Map';

const MapContainer = ({ counseling, psychiatric, navigation }) => {
  return (
    <Map
      counseling={counseling}
      psychiatric={psychiatric}
      navigation={navigation}
    />
  );
};

const mapStateToProps = (state) => ({
  counseling: state.handleCurrentOnMap.counseling,
  psychiatric: state.handleCurrentOnMap.psychiatric,
});

export default connect(mapStateToProps)(MapContainer);
