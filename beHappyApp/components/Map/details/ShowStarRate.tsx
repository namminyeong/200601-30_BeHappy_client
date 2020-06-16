import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ShowStarRateAvg({ data }) {
  let stars = [];
  {
    for (let i = data.rate; i > -4; i--) {
      if (i > 0) {
        stars.push(
          <AntDesign
            name='star'
            key={'full' + i.toString()}
            size={16}
            style={{ color: '#D61A3C' }}
          />
        );
      } else {
        stars.push(
          <AntDesign
            name='star'
            key={'o' + i.toString()}
            size={16}
            style={{ color: '#B2BEC3' }}
          />
        );
      }
    }
  }

  return (
    <View style={styles.rateStar}>
      {stars.slice(0, 5)}
      <Text style={{ paddingLeft: 6, fontWeight: 'bold' }}>{data.rate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rateStar: { flexDirection: 'row', alignItems: 'center', paddingBottom: 5 },
});
