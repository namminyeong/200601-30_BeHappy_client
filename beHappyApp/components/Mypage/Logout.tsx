import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'


export default function Logout({ status, isLogout }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {
        isLogout(status)
      }}>
        <Text style={styles.logoutText}>logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logoutText: {
    marginTop: 20,
    color: '#62CCAD',
    paddingRight: '6%',
    fontWeight: 'bold',
  }
})
