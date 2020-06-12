import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        <Text style={styles.distance}>
          {`(`}
          {centerInfo[showDetails][showDetailsIndex].distance.toString()}m{`)`}
        </Text>
      </Text>

      {/* <Text style={styles.text}>
        {centerInfo[showDetails][showDetailsIndex].phone}
      </Text> */}
      <View style={{ flexDirection: 'row' }}>
        <MaterialCommunityIcons
          name='bookmark-outline'
          color='black'
          size={50}
          style={{ left: 20 }}
        />
        <MaterialCommunityIcons
          name='phone'
          color='black'
          size={50}
          style={{ left: 30 }}
        />
        <Text style={styles.review}>
          평점 <Text>{centerInfo[showDetails][showDetailsIndex].rateAvg}</Text>
        </Text>
      </View>
    </View>
  ) : (
    <Fragment />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    zIndex: 1,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    height: 40,
  },
  distance: {
    fontSize: 15,
    textAlign: 'center',
    height: 40,
  },
  review: {
    top: 10,
    fontSize: 20,
    left: 60,
  },
});

export default Details;
