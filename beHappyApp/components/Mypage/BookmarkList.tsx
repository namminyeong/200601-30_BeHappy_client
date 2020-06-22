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
        <Text style={styles.text}>{centerName}</Text>
        <MaterialCommunityIcons name='map-marker-radius' size={20} />
      </TouchableOpacity>

      {specialties.length > 0 ? (
        <View style={styles.specialtiesInfo}>
          {specialties.map((data, index) => (
            <Text key={index} style={styles.specialty}>
              #{data.name}
            </Text>
          ))}
        </View>
      ) : (
        <Text style={styles.specialtyText}>
          아직 등록된 전문분야가 없습니다
        </Text>
      )}
      <Button
        small
        transparent
        onPress={() => deleteBookmark(centerId)}
        style={styles.deleteBtn}
      >
        <FontAwesome name='trash-o' size={23} />
      </Button>
      <ShowStarRateAvg rateAvg={rateAvg} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    left: '1%',
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
  text: {
    textDecorationLine: 'underline',
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialtiesInfo: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  specialty: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
    marginRight: 8,
    paddingVertical: 1,
    paddingHorizontal: 8,
    backgroundColor: '#62CCAD',
    borderRadius: 10,
  },
  specialtyText: {
    marginTop: 10,
    marginBottom: 5,
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
