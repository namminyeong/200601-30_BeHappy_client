import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
      <TouchableOpacity
        onPress={() => {
          controlCoordinate(latitude, longitude);
          controlCenterData([bookmark], [bookmark]);
          navigation.navigate('MapStack', {
            screen: 'MapContainer',
          });
          controlBookmarkClicked(true);
        }}
        style={{ flexDirection: 'row' }}
      >
        <Text
          style={
            centerName.length > 15 ? styles.centerNameLong : styles.centerName
          }
        >
          {centerName}
        </Text>
        <MaterialCommunityIcons
          name='map-marker-radius'
          size={20}
          style={styles.icon}
        />
      </TouchableOpacity>

      {specialties.length > 0 ? (
        <View
          style={specialties.length > 6 ? styles.long : styles.specialtiesInfo}
        >
          {specialties.map((data) => (
            <Text key={data} style={styles.specialty}>
              #{data}
            </Text>
          ))}
        </View>
      ) : (
        <View />
      )}
      <Button
        small
        transparent
        onPress={() => deleteBookmark(centerId)}
        style={styles.deleteBtn}
      >
        <FontAwesome name='trash-o' size={23} />
      </Button>
      {rateAvg > 0 ? (
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.rateText}>{rateAvg.toFixed(1)}</Text>
          <ShowStarRateAvg rateAvg={rateAvg} />
        </View>
      ) : (
        <Text style={styles.noReview}>아직 리뷰가 없습니다</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    height: 140,
    left: '2%',
    width: '96%',
    backgroundColor: 'white',
    flex: 1,
    marginBottom: 15,
    padding: 10,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteBtn: {
    right: 20,
    top: 10,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  centerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  centerNameLong: {
    textDecorationLine: 'underline',
    letterSpacing: -1,
    fontSize: 17,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 3,
    alignSelf: 'center',
  },
  specialtiesInfo: {
    marginTop: 5,
    marginBottom: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  long: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  specialty: {
    color: 'white',
    fontSize: 13,
    marginTop: 5,
    marginRight: 6,
    paddingVertical: 1,
    paddingHorizontal: 7,
    backgroundColor: '#62CCAD',
    borderRadius: 10,
  },
  rateText: {
    fontSize: 17,
    alignSelf: 'center',
    marginRight: 5,
    fontWeight: 'bold',
  },
  noReview: {
    top: '10%',
  },
  showMapBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignSelf: 'flex-end',
    padding: 10,
    marginTop: 5,
  },
});

export default BookmarkList;
