import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

class Map extends React.Component {
  render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <Text>map !!</Text>
        <MapView
          style={styles.map}
          showsUserLocation={false}
          zoomEnabled={true}
          initialRegion={{
            latitude: 37.52,
            longitude: 126.97,
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
