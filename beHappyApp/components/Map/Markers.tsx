import React from 'react';
import { Marker } from 'react-native-maps';

function Markers({
  center,
  importance,
  index,
  latitude,
  longitude,
  controlShowDetail,
  specialties,
  name,
}) {
  const onPressEvent = () => {
    controlShowDetail(center, index);
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
      title={specialties.length > 0 ? specialties : name}
      pinColor={importance === 0 ? 'gold' : importance === 1 ? 'orange' : 'red'}
      onPress={onPressEvent}
      identifier={'centers'}
    />
  );
}
export default Markers;
