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
          size={45}
          style={{ left: 20, marginHorizontal: 2 }}
          onPress={() => postDeletebookmark(bookmark, centerInfo.id)}
        />
        <MaterialCommunityIcons
          name='phone'
          color='black'
          size={45}
          style={{ left: 30, marginHorizontal: 2 }}
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
                {centerInfo.rateAvg.length > 1
                  ? `${centerInfo.rateAvg}`
                  : `${centerInfo.rateAvg}.0`}
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
    zIndex: 2,
    paddingHorizontal: 3,
  },
  center: {
    top: 7,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 40,
  },
  address: {
    top: 3,
    fontSize: 17,
    textAlign: 'center',
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
    left: 32,
    fontWeight: 'bold',
  },
  star: {
    left: 32,
  },
});

export default Details;
