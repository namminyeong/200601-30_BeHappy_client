import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';

function Filter({
  specialties,
  centerTags,
  controlCenterTags,
  controlSpecialties,
  controlShowDetail,
}) {
  const changeSpecialtiesFilter = (specialty) => {
    let newState = Object.assign({}, specialties);
    newState[specialty] = !newState[specialty];
    controlSpecialties(newState);
    controlShowDetail(false, null);
  };

  const changeCenterFilter = (center) => {
    let newState = Object.assign({}, centerTags);
    newState[center] = !newState[center];
    controlCenterTags(newState);
    controlShowDetail(false, null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>필터 조건을 1개 이상 선택해주세요 :)</Text>
      <Text style={styles.title}>관심분야</Text>

      <View style={styles.specialties}>
        {Object.keys(specialties).map((specialty) => {
          return (
            <Button
              key={specialty}
              transparent
              onPress={() => changeSpecialtiesFilter(specialty)}
            >
              <Text
                style={
                  specialties[specialty] ? styles.selected : styles.notSelected
                }
              >
                #{specialty}
              </Text>
            </Button>
          );
        })}
      </View>
      <Text style={styles.title}>선호센터</Text>

      <View style={{ flexDirection: 'row' }}>
        {Object.keys(centerTags).map((center) => (
          <Button
            key={center}
            transparent
            onPress={() => changeCenterFilter(center)}
          >
            <Text
              style={centerTags[center] ? styles.selected : styles.notSelected}
            >
              {center === 'psychiatric' ? '정신과' : '심리센터'}
            </Text>
          </Button>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 10,
  },
  specialties: { flexDirection: 'row', flexWrap: 'wrap' },
  selected: {
    backgroundColor: '#62ccad',
    marginTop: -2,
    borderRadius: 12,
    padding: 3,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  notSelected: {
    backgroundColor: '#D1D1D1',
    marginTop: -2,
    borderRadius: 12,
    padding: 3,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Filter;
