import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


const Counter = ({ number, onIncrease, onDecrease }) => {
  return (
    <View>
      <Text>{number}</Text>
      <Text onPress={onIncrease}>+ 1</Text>
      <Text onPress={onDecrease}>- 1</Text>
    </View>
  )
}

export default Counter;
