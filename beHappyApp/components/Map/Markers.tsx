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
  const onPressEvent = () => {
    handleShowDetails(center, index);
  };
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);
  return (
    <Marker
      key={latitude}
      coordinate={{
        latitude: lat,
        longitude: lon,
      }}
      pinColor={color}
      onPress={onPressEvent}
    />
  );
}

export default Markers;
