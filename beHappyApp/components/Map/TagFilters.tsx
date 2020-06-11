import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'native-base';

function TagFilters({ tag, index, selected }) {
  // const onPressEvent = () => {
  // };
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>#{tag}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 30,
    backgroundColor: '#62ccad',
  },
  text: {
    borderRadius: 10,

    padding: 10,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TagFilters;
