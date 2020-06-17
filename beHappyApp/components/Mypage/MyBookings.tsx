import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import MyBookingList from './MyBookingList';

export default function MyBookmarks({}) {
  return (
    <SafeAreaView style={styles.container}>
      <MyBookingList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
  },
});
