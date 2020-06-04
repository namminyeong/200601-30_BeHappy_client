import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MapMain() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Map !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 30,
  },
});
