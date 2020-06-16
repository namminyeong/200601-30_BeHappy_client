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
      // image={
      //   importance === 0
      //     ? require('../../assets/low.png')
      //     : importance === 1
      //     ? require('../../assets/medium.png')
      //     : require('../../assets/high.png')
      // }
      onPress={onPressEvent}
      identifier={'centers'}
    >
      {/* <Image
        source={require('../../assets/low.png')}
        style={{ width: 15, height: 15 }}
      /> */}
    </Marker>
  );
}
export default Markers;
