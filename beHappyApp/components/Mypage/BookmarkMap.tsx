import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

class BookmarkMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myLatitude: this.props.navigation.state.params.latitude,
      myLongitude: this.props.navigation.state.params.longitude,
      myLatitudeDelta: 0.03,
      myLongitudeDelta: 0.02,
    };
  }

  render() {
    const coordinate = this.props.navigation.state.params.coordinate;
    const {
      myLatitude,
      myLongitude,
      myLatitudeDelta,
      myLongitudeDelta,
    } = this.state;

    return (
      <View style={{ width: '100%', height: '100%' }}>
        <MapView
          moveOnMarkerPress={false}
          style={{ flex: 1 }}
          showsUserLocation={false}
          zoomEnabled={true}
          initialRegion={{
            latitude: myLatitude,
            longitude: myLongitude,
            latitudeDelta: myLatitudeDelta,
            longitudeDelta: myLongitudeDelta,
          }}
        >
          <Marker
            coordinate={{ latitude: myLatitude, longitude: myLongitude }}
            pinColor='#000000'
          />
        </MapView>
      </View>
    );
  }
}

export default BookmarkMap;
