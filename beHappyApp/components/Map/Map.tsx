import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Header, Icon, Item, Button } from 'native-base';

class Map extends React.Component {
  state = {
    latitude: 37.52,
    longitude: 126.97,
  };

  componentDidMount() {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;
        this.setState({ latitude, longitude });
      }
    })();
  }

  render() {
    const { latitude, longitude } = this.state;
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <Header searchBar rounded style={{ backgroundColor: 'white' }}>
            <Item>
              <Icon active name='search' />
              <Button
                transparent
                style={styles.buttonGeo}
                onPress={() => {
                  this.props.navigation.navigate('SearchGeoContainer');
                }}
              >
                <Text>지역으로 검색</Text>
              </Button>

              <Button
                transparent
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate('Search');
                }}
              >
                <Text>이름으로 검색</Text>
              </Button>
            </Item>
          </Header>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row' }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <Text style={styles.hashtag}>#스트레스</Text>
                <Text style={styles.hashtag}>#가족</Text>
                <Text style={styles.hashtag}>#우울증</Text>
                <Text style={styles.hashtag}>#식이</Text>
                <Text style={styles.hashtag}>#부부</Text>
                <Text style={styles.hashtag}>#불면증</Text>
                <Text style={styles.hashtag}>#학교폭력</Text>
                <Text style={styles.hashtag}>#아동</Text>
                <Text style={styles.hashtag}>#불안</Text>
                <Text style={styles.hashtag}>#강박</Text>
              </ScrollView>
            </View>
            <Text style={{ right: 0 }}>
              {/* <MaterialCommunityIcons name='filter-outline' size={26} /> */}
              Filter
            </Text>
          </View>
        </View>
        <MapView
          style={styles.map}
          showsUserLocation={false}
          zoomEnabled={true}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            coordinate={{ latitude: latitude, longitude: longitude }}
            pinColor='#000000'
            image={require('../../assets/mylocation.png')}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: '80%',
  },
  text: {
    fontSize: 30,
  },
  container: {
    backgroundColor: 'white',
    height: '13.5%',
  },
  buttonGeo: {
    color: 'white',
    width: '40%',
  },
  button: {
    width: '40%',
  },
  hashtag: {
    fontSize: 15,
    marginTop: 9,
    left: 20,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    backgroundColor: '#62CCAD',
    color: 'white',
    borderRadius: 10,
  },
});

export default Map;
