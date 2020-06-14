import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ShowStarRateAvg({ data }) {
  return (
    <View>
      {data.rate === 5 ? (
        <View style={styles.rateStar}>
          <AntDesign name='star' size={16} style={{ color: '#D61A3C' }} />
          <AntDesign name='star' size={16} style={{ color: '#D61A3C' }} />
          <AntDesign name='star' size={16} style={{ color: '#D61A3C' }} />
          <AntDesign name='star' size={16} style={{ color: '#D61A3C' }} />
          <AntDesign name='star' size={16} style={{ color: '#D61A3C' }} />
          <Text style={{ paddingLeft: 6, fontWeight: 'bold' }}>{data.rate}</Text>
        </View>
      ) : data.rate === 4 ? (
        <View style={styles.rateStar}>
          <AntDesign name='star' size={16} style={{ color: '#D61A3C' }} />
          <AntDesign name='star' size={16} style={{ color: '#D61A3C' }} />
          <AntDesign name='star' size={16} style={{ color: '#D61A3C' }} />
          <AntDesign name='star' size={16} style={{ color: '#D61A3C' }} />
          <AntDesign name='star' size={16} style={{ color: '#B2BEC3' }} />
          <Text style={{ paddingLeft: 6, fontWeight: 'bold' }}>{data.rate}</Text>
        </View>
      ) : data.rate === 3 ? (
        <View style={styles.rateStar}>
          <AntDesign name='star' size={16} style={{ color: '#D61A3C' }} />
          <AntDesign name='star' size={16} style={{ color: '#D61A3C' }} />
          <AntDesign name='star' size={16} style={{ color: '#D61A3C' }} />
          <AntDesign name='star' size={16} style={{ color: '#B2BEC3' }} />
          <AntDesign name='star' size={16} style={{ color: '#B2BEC3' }} />
          <Text style={{ paddingLeft: 6, fontWeight: 'bold' }}>{data.rate}</Text>
        </View>
      ) : data.rate === 2 ? (
        <View style={styles.rateStar}>
          <AntDesign name='star' size={16} style={{ color: '#D61A3C' }} />
          <AntDesign name='star' size={16} style={{ color: '#D61A3C' }} />
          <AntDesign name='star' size={16} style={{ color: '#B2BEC3' }} />
          <AntDesign name='star' size={16} style={{ color: '#B2BEC3' }} />
          <AntDesign name='star' size={16} style={{ color: '#B2BEC3' }} />
          <Text style={{ paddingLeft: 6, fontWeight: 'bold' }}>{data.rate}</Text>
        </View>
      ) : (
        <View style={styles.rateStar}>
          <AntDesign name='star' size={16} style={{ color: '#D61A3C' }} />
          <AntDesign name='star' size={16} style={{ color: '#B2BEC3' }} />
          <AntDesign name='star' size={16} style={{ color: '#B2BEC3' }} />
          <AntDesign name='star' size={16} style={{ color: '#B2BEC3' }} />
          <AntDesign name='star' size={16} style={{ color: '#B2BEC3' }} />
          <Text style={{ paddingLeft: 6, fontWeight: 'bold' }}>{data.rate}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rateStar: { flexDirection: 'row', alignItems: 'center', paddingBottom: 5 },
});
