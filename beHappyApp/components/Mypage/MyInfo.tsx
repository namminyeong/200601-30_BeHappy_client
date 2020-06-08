import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function MyInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MyInfo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  text: {
    fontSize: 30
  }
})
