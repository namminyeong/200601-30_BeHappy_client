import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from 'react-native';

function Details({ centerInfo, showDetails, showDetailsIndex, navigation }) {
  const onPressEvent = () => {
    navigation.navigate('DetailsHome');
  };
  return showDetails !== false ? (
    <View style={styles.container}>
      <Text style={styles.text} onPress={onPressEvent}>
        {centerInfo[showDetails][showDetailsIndex].centerName}
      </Text>
      <Text style={styles.text}>
        {centerInfo[showDetails][showDetailsIndex].roadAddressName}
      </Text>
      <Text style={styles.text}>
        {centerInfo[showDetails][showDetailsIndex].phone}
      </Text>
    </View>
  ) : (
    <Fragment />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    height: 40,
  },
});

export default Details;
