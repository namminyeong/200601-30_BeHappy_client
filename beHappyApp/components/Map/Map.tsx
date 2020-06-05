import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

class Map extends React.Component {
  state = {
    latitude: 37.52,
    longitude: 126.97,
  };

  componentDidMount() {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;
        console.log('before', this.state);
        this.setState({ latitude, longitude });
        console.log('after', this.state);
      }
    })();
  }

  render() {
    const { latitude, longitude } = this.state;
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <Text>map !!</Text>
        <MapView
          style={styles.map}
          showsUserLocation={false}
          zoomEnabled={true}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  text: {
    fontSize: 30,
  },
});

export default Map;
