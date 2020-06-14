import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DetailHomeBody(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <MaterialCommunityIcons name='city' size={20} />
        {'    '}
        {props.route.params.roadAddressName}
      </Text>
      <Text style={styles.text}>
        <MaterialCommunityIcons name='phone-classic' size={20} />
        {'    '}
        {props.route.params.phone}
      </Text>
      <Text style={styles.text}>
        <MaterialCommunityIcons name='clock-outline' size={20} />
        {'   '}오전 09:00 ~ 오후 10:00
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 10,
    left: 20,
  },
  text: {
    fontSize: 20,
    marginVertical: 20,
  },
});
