import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function DetailsHome() {
  return <Text style={styles.container}>Details Home</Text>;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
