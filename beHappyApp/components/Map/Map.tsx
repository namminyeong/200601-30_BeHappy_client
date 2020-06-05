import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

class Map extends React.Component {
  //   componentDidMount() {
  //     const askPermission = async () => {
  //       try {
  //         const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  //         check(PERMISSIONS.IOS.LOCATION_ALWAYS)
  //           .then(result => {
  //             switch (result) {
  //               case RESULTS.UNAVAILABLE:
  //                 console.log(
  //                   'This feature is not available (on this device / in this context)',
  //                 );
  //                 break;
  //               case RESULTS.DENIED:
  //                 console.log(
  //                   'The permission has not been requested / is denied but requestable',
  //                 );
  //                 break;
  //               case RESULTS.GRANTED:
  //                 console.log('The permission is granted');
  //                 break;
  //               case RESULTS.BLOCKED:
  //                 console.log(
  //                   'The permission is denied and not requestable anymore',
  //                 );
  //                 break;
  //             }
  //           })
  //           .catch(error => {
  //             // …
  //           });
  //       } catch (error) {
  //         console.log('askPermission', error);
  //       }
  //     };
  //   }

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
