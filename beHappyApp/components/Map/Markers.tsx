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
  return (
    <Marker
      key={index}
      coordinate={{
        latitude,
        longitude,
      }}
      pinColor={color}
      onPress={onPressEvent}
    />
  );
}

export default Markers;
