import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Linking from 'expo-linking';
import DetailsMiniStarRateAvg from './DetailsMiniStarRateAvg';

function Details({ navigation, centerInfo, bookmark, postBookmark }) {
  const showDetailHome = () => {
    navigation.navigate('DetailsHome', {
      theCenterInfo: centerInfo,
      bookmark: bookmark,
      postDeletebookmark: postDeletebookmark,
    });
  };

  const call = () => {
    Linking.openURL(`tel:${centerInfo.phone}`);
  };

  const postDeletebookmark = (bookmark, id) => {
    if (bookmark === true) {
      postBookmark('DELETE', id);
    } else {
      postBookmark('POST', id);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={showDetailHome}>
        <Text style={styles.center}>{centerInfo.centerName}</Text>
        <Text style={styles.address}>
          {centerInfo.roadAddressName}
          {centerInfo.distance ? (
            <Text style={styles.distance}>
              {'  '}
              {`(`}
              {centerInfo.distance.toString()}m{`)`}
            </Text>
          ) : (
            ''
          )}
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <MaterialCommunityIcons
          name='bookmark'
          color={bookmark ? 'black' : 'lightgrey'}
          size={40}
          style={{ marginHorizontal: 2 }}
          onPress={() => postDeletebookmark(bookmark, centerInfo.id)}
        />
        <MaterialCommunityIcons
          name='phone'
          color='black'
          size={40}
          style={{ left: 10, marginHorizontal: 2 }}
          onPress={call}
        />
        <View
          style={{
            left: 15,
            width: '70%',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          {centerInfo.rateAvg === 0 ? (
            <Text style={styles.noReview}>아직 리뷰가 없습니다.</Text>
          ) : (
            <>
              <Text style={styles.review}>
                {Number.isInteger(centerInfo.rateAvg)
                  ? `${centerInfo.rateAvg}.0`
                  : `${centerInfo.rateAvg.toFixed(1)}`}
              </Text>
              <View style={styles.star}>
                <DetailsMiniStarRateAvg rateAvg={centerInfo.rateAvg} />
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 7,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '20%',
    backgroundColor: 'white',
    paddingHorizontal: 17,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.9,
    shadowRadius: 11.14,
    elevation: 17,
  },
  center: {
    left: 10,
    top: 15,
    fontSize: 22,
    fontWeight: 'bold',
    height: 40,
  },
  address: {
    left: 10,
    top: 7,
    fontSize: 16,
    height: 40,
  },
  distance: {
    fontSize: 15,
    textAlign: 'center',
    height: 40,
  },
  noReview: {
    width: '100%',
    textAlign: 'center',
  },
  review: {
    marginHorizontal: 7,
    fontSize: 20,
    left: 27,
    fontWeight: 'bold',
  },
  star: {
    left: 30,
  },
});

export default Details;
