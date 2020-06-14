import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ShowStarRateAvg({ rateAvg }) {
  return (
    <View style={{ paddingTop: 6 }}>
      {rateAvg > 4.5 ? (
        <View style={styles.rateStarAvg}>
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
        </View>
      ) : rateAvg === 4.5 ? (
        <View style={styles.rateStarAvg}>
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-half-empty' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
        </View>
      ) : rateAvg > 3.5 ? (
        <View style={styles.rateStarAvg}>
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
        </View>
      ) : rateAvg === 3.5 ? (
        <View style={styles.rateStarAvg}>
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-half-full' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
        </View>
      ) : rateAvg > 2.5 ? (
        <View style={styles.rateStarAvg}>
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
        </View>
      ) : rateAvg === 2.5 ? (
        <View style={styles.rateStarAvg}>
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-half-full' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
        </View>
      ) : rateAvg > 1.5 ? (
        <View style={styles.rateStarAvg}>
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
        </View>
      ) : rateAvg === 1.5 ? (
        <View style={styles.rateStarAvg}>
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-half-full' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
        </View>
      ) : rateAvg > 0.5 ? (
        <View style={styles.rateStarAvg}>
          <FontAwesome name='star' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
        </View>
      ) : (
        <View style={styles.rateStarAvg}>
          <FontAwesome name='star-half-full' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
          <FontAwesome name='star-o' size={24} style={{ color: '#D61A3C', paddingRight: 3 }} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rateStarAvg: { flexDirection: 'row', alignItems: 'center', paddingBottom: 5 },
});
