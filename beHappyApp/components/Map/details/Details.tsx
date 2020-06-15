import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Linking from 'expo-linking';

function Details({ navigation, centerInfo, bookmark, postBookmark }) {
  const showDetailHome = () => {
    navigation.navigate('DetailsHome', {
      theCenterInfo: centerInfo,
    });
  };

  const call = () => {
    Linking.openURL(`tel:${centerInfo.phone}`);
  };

  const check = () => {
    let exist = false;
    let index;
    bookmark.forEach((ele, i) => {
      if (ele.id === centerInfo.id) {
        exist = true;
        index = i;
      }
    });
    return [exist, index];
  };

  const bookmarked = check();

  const postDeletebookmark = () => {
    if (bookmarked[0] === true) {
      postBookmark('DELETE', centerInfo.id, bookmarked[1]);
    } else {
      postBookmark('POST', centerInfo.id, centerInfo);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={showDetailHome}>
        <Text style={styles.text}>{centerInfo.centerName}</Text>
        <Text style={styles.text}>
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
      {/* <Text style={styles.text}>
        {centerInfo.phone}
      </Text> */}
      <View style={{ flexDirection: 'row' }}>
        <MaterialCommunityIcons
          name='bookmark'
          color={bookmarked[0] ? 'black' : 'lightgrey'}
          size={50}
          style={{ left: 20 }}
          onPress={postDeletebookmark}
        />
        <MaterialCommunityIcons
          name='phone'
          color='black'
          size={50}
          style={{ left: 30 }}
          onPress={call}
        />
        <Text style={styles.review}>
          평점 <Text>{centerInfo.rateAvg}</Text>
        </Text>
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
