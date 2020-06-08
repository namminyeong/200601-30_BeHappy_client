import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Map from './Map';

export default function MapMain() {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
