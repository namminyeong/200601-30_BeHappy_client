import React from 'react';
import { Marker } from 'react-native-maps';

function Markers({
  index,
  latitude,
  longitude,
  color,
  center,
  handleShowDetails,
}) {
  return (
    <Marker
      key={index}
      coordinate={{
        latitude,
        longitude,
      }}
      pinColor={color}
      onPress={() => handleShowDetails(center, index)}
    />
  );
}

export default Markers;
