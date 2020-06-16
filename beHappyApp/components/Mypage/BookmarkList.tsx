import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import ShowStarRateAvg from '../Map/details/ShowStarRateAvg';

const BookmarkList = ({
  bookmark,
  deleteBookmark,
  navigation,
  controlCenterData,
  controlBookmarkClicked,
  controlCoordinate,
}) => {
  const centerId = bookmark.id;
  const centerName = bookmark.centerName;
  const latitude = bookmark.latitude;
  const longitude = bookmark.longitude;
  const specialties = bookmark.specialties;
  const rateAvg = bookmark.rateAvg;

  return (
    <View style={styles.container}>
      <View style={styles.leftContents}>
        <Text style={styles.text}>{centerName}</Text>
        {specialties.length > 0 ? (
          <TouchableOpacity style={styles.hashtagButton}>
            <Text style={{ color: 'white' }}>#{specialties}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.specialtyText}>전문분야가 없습니다.</Text>
        )}

        <ShowStarRateAvg rateAvg={rateAvg} />
      </View>
      <View style={styles.rightContents}>
        <TouchableOpacity
          onPress={() => {
            deleteBookmark(centerId);
          }}
        >
          <Text style={styles.deleteBtn}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.showMapBtn}
          onPress={() => {
            controlCoordinate(latitude, longitude);
            controlCenterData([bookmark], [bookmark]);
            navigation.navigate('MapStack', {
              screen: 'MapContainer',
            });
            controlBookmarkClicked(true);
          }}
        >
          <Text>지도 보기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
  },
  leftContents: {
    flex: 3,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  hashtagButton: {
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#62CCAD',
    borderRadius: 10,
  },
  specialtyText: {
    marginTop: 10,
    marginBottom: 5,
  },
  rightContents: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  showMapBtn: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#59cbbd',
    marginTop: 5,
    fontWeight: 'bold',
  },
  deleteBtn: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookmarkList;
