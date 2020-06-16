import React from 'react';
import { Marker } from 'react-native-maps';
import { Image } from 'react-native';

function Markers({
  center,
  importance,
  index,
  latitude,
  longitude,
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
      title='Reviews'
      description='5.0'
      pinColor={
        importance === 0 ? 'yellow' : importance === 1 ? 'orange' : 'red'
      }
      onPress={onPressEvent}
      identifier={'centers'}
    />
  );
}
export default Markers;
