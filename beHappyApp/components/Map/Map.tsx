import React, { Fragment } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Header, Icon, Item, Button } from 'native-base';
import Markers from './Markers';
import Details from './Details';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();
import deviceStorage from '../../service/DeviceStorage';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myLatitude: 37.52,
      myLongitude: 126.97,
      myLatitudeDelta: 0.03,
      myLongitudeDelta: 0.02,
      showDetails: false,
      showDetailsIndex: null,
    };

    this.handleShowDetails = this.handleShowDetails.bind(this);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.findCentersFromCurrentLocation = this.findCentersFromCurrentLocation.bind(
      this
    );
    this.goCurrentLocation = this.goCurrentLocation.bind(this);
  }

  componentDidMount() {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        let myLatitude = location.coords.latitude;
        let myLongitude = location.coords.longitude;
        this.setState({
          myLongitude,
          myLatitude,
        });
        this.props.controlCoordinate(myLongitude, myLatitude);
        this.findCentersFromCurrentLocation();
      }
    })();
  }

  handleShowDetails(center, index) {
    this.setState({
      showDetails: center,
      showDetailsIndex: index,
    });
  }

  findCentersFromCurrentLocation() {
    const coordinate = this.props.coordinate;
    let url =
      ec2 +
      '/search/location?radius=5000&latitude=' +
      coordinate[1] +
      '&longitude=' +
      coordinate[0];
    console.log(url);
    fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return '';
      })
      .then((data) => {
        if (typeof data === 'object') {
          let counseling = data.counseling;
          let psychiatric = data.psychiatric;
          this.props.controlCenterData(counseling, psychiatric);
        }
      });
  }

  goCurrentLocation() {
    this.props.controlCoordinate(this.state.myLongitude, this.state.myLatitude);
  }

  onRegionChangeComplete(lon, lat) {
    this.props.controlCoordinate(lon, lat);
  }

  render() {
    const coordinate = this.props.coordinate;
    const { myLatitude, myLongitude } = this.state;

    console.log('112!!!', Boolean(this.props.counseling));

    return (
      <View style={{ width: '100%', height: '100%', flex: 1 }}>
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
                  this.props.navigation.navigate('SearchName');
                }}
              >
                <Text>이름으로 검색</Text>
              </Button>
            </Item>
          </Header>
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
        </View>
        <MapView
          style={styles.map}
          showsUserLocation={false}
          zoomEnabled={true}
          region={{
            latitude: coordinate[1],
            longitude: coordinate[0],
            latitudeDelta: 0.03,
            longitudeDelta: 0.02,
          }}
          onRegionChangeComplete={(e) => {
            this.onRegionChangeComplete(
              e.longitude.toFixed(6),
              e.latitude.toFixed(6)
            );
          }}
          onPress={() => {
            this.handleShowDetails(false, null);
          }}
        >
          <Marker
            coordinate={{ latitude: myLatitude, longitude: myLongitude }}
            pinColor='#000000'
            image={require('../../assets/mylocation.png')}
          />
          {this.props.counseling ? (
            this.props.counseling.map((ele, index) => (
              <Markers
                index={index}
                latitude={ele.latitude}
                longitude={ele.longitude}
                color='red'
                center='counseling'
                handleShowDetails={this.handleShowDetails}
              />
            ))
          ) : (
            <Fragment />
          )}
          {this.props ? (
            this.props.psychiatric.map((ele, index) => (
              <Markers
                index={index}
                latitude={ele.latitude}
                longitude={ele.longitude}
                color='green'
                center='psychiatric'
                handleShowDetails={this.handleShowDetails}
              />
            ))
          ) : (
            <Fragment />
          )}
        </MapView>
        <Details
          showDetails={this.state.showDetails}
          showDetailsIndex={this.state.showDetailsIndex}
          centerInfo={{
            counseling: this.props.counseling,
            psychiatric: this.props.psychiatric,
          }}
          navigation={this.props.navigation}
        />
        <View style={styles.searchNow}>
          <Button
            small
            dark
            rounded
            onPress={this.findCentersFromCurrentLocation}
          >
            <Text style={{ padding: 10, color: 'white' }}>
              현 위치에서 검색하기
            </Text>
          </Button>
        </View>
        <View style={styles.goCurrentLocation}>
          <MaterialCommunityIcons
            name='crosshairs-gps'
            size={26}
            onPress={this.goCurrentLocation}
          />
        </View>
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
  searchNow: {
    height: 10,
    position: 'absolute',
    left: 15,
    top: 110,
    padding: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  goCurrentLocation: {
    backgroundColor: 'white',
    position: 'absolute',
    right: 15,
    bottom: 30,
    padding: 5,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
});

export default Map;
