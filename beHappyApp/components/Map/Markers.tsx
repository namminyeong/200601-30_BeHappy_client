import React from 'react';
import { Marker } from 'react-native-maps';

function Markers({ center, index, latitude, longitude, handleShowDetails }) {
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
      title='Reviews'
      description='5.0'
      pinColor={'orange'}
      onPress={onPressEvent}
      identifier={'centers'}
    />
  );
}
export default Markers;
