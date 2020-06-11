import React, { Fragment } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Header, Icon, Item, Button } from 'native-base';
import Markers from './Markers';
import Details from './Details';
import TagFilters from './TagFilters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();

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
      countTags: 10,
      tags: [
        ['스트레스', true],
        ['가족', true],
        ['우울증', true],
        ['식이', true],
        ['부부', true],
        ['불면증', true],
        ['학교폭력', true],
        ['아동', true],
        ['불안', true],
        ['강박', true],
      ],
      centerTags: [['정신과', true], ['심리센터', true]],
    };

    this.handleShowDetails = this.handleShowDetails.bind(this);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.findCentersFromCurrentLocation = this.findCentersFromCurrentLocation.bind(
      this
    );
    this.goCurrentLocation = this.goCurrentLocation.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.countTags = this.countTags.bind(this);
    this.changeAllFilter = this.changeAllFilter.bind(this);
    this.pressAll = this.pressAll.bind(this);
    this.checkTagsForUrl = this.checkTagsForUrl.bind(this);
    this.changeCenterFilter = this.changeCenterFilter.bind(this);
  }

  changeFilter(index) {
    let newState = this.state.tags;
    let present = newState[index][1];
    newState[index][1] = !present;
    this.countTags(!present);
    this.setState({
      tags: newState,
    });
  }

  changeCenterFilter(index) {
    let newState = this.state.centerTags;
    let present = newState[index][1];
    newState[index][1] = !present;
    this.setState({
      centerTags: newState,
    });
  }

  changeAllFilter(status) {
    let newState = this.state.tags;
    newState = newState.map((ele) => [ele[0], status]);
    this.countTags(null, status);
    this.setState({
      tags: newState,
    });
  }

  countTags(status, allStatus) {
    if (status === true) {
      this.state.countTags += 1;
    } else if (status === false) {
      this.state.countTags -= 1;
    } else if (allStatus === true) {
      this.state.countTags = 10;
    } else {
      this.state.countTags = 0;
    }
  }

  pressAll() {
    if (this.state.countTags === 10) {
      this.changeAllFilter(false);
    } else {
      this.changeAllFilter(true);
    }
  }

  componentDidMount() {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
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

  checkTagsForUrl() {
    if (this.state.countTags === (this.state.tags.length || 0)) {
      return '';
    }
    let allTags = this.state.tags.reduce((acc, cur) => {
      if (cur[1] === true) {
        acc.push(cur[0]);
        return acc;
      }
      return acc;
    }, []);
    return '&tags='.concat(allTags);
  }

  findCentersFromCurrentLocation() {
    const coordinate = this.props.coordinate;
    let tags = this.checkTagsForUrl();
    let url =
      ec2 +
      '/search/location?radius=5000&latitude=' +
      coordinate[1] +
      '&longitude=' +
      coordinate[0] +
      tags;
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
    this.props.controlCoordinate(
      this.state.myLongitude,
      this.state.myLatitude,
      this.state.myLatitudeDelta,
      this.state.myLongitudeDelta
    );
  }

  onRegionChangeComplete(lon, lat, lonDelta, latDelta) {
    this.props.controlCoordinate(lon, lat, lonDelta, latDelta);
  }

  render() {
    const coordinate = this.props.coordinate;
    const { myLatitude, myLongitude } = this.state;

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
                  this.props.navigation.navigate('SearchNameContainer');
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
              {this.state.tags.map((tagArr, index) => (
                <TagFilters
                  key={tagArr[0]}
                  tag={tagArr[0]}
                  index={index}
                  changeFilter={this.changeFilter}
                  selected={tagArr[1]}
                />
              ))}
            </ScrollView>
            <Button transparent onPress={this.pressAll}>
              <Text style={styles.allText}>All</Text>
            </Button>
          </View>
          <View
            style={{
              left: 10,
              width: '95%',
              borderBottomWidth: 1,
              borderColor: 'lightgrey',
            }}
          />
          <View style={{ flexDirection: 'row' }}>
            {this.state.centerTags.map((tagArr, index) => (
              <Button
                key={tagArr[0]}
                transparent
                onPress={() => this.changeCenterFilter(index)}
              >
                <Text style={tagArr[1] ? styles.selected : styles.notSelected}>
                  {tagArr[0]}
                </Text>
              </Button>
            ))}
          </View>
        </View>
        <MapView
          moveOnMarkerPress={false}
          style={styles.map}
          showsUserLocation={false}
          zoomEnabled={true}
          region={{
            latitude: coordinate[1],
            longitude: coordinate[0],
            latitudeDelta: coordinate[3],
            longitudeDelta: coordinate[2],
          }}
          onRegionChangeComplete={(e) => {
            this.onRegionChangeComplete(
              e.longitude.toFixed(6),
              e.latitude.toFixed(6),
              e.longitudeDelta.toFixed(6),
              e.latitudeDelta.toFixed(6)
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
          {this.props.counseling && this.state.centerTags[1][1] ? (
            this.props.counseling.map((ele, index) => (
              <Markers
                key={ele.latitude}
                index={index}
                latitude={ele.latitude}
                longitude={ele.longitude}
                center='counseling'
                handleShowDetails={this.handleShowDetails}
              />
            ))
          ) : (
            <Fragment />
          )}
          {this.props.psychiatric && this.state.centerTags[0][1] ? (
            this.props.psychiatric.map((ele, index) => (
              <Markers
                key={ele.latitude}
                index={index}
                latitude={ele.latitude}
                longitude={ele.longitude}
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
    height: '20%',
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
    height: 0,
    position: 'absolute',
    left: 6,
    top: 150,
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
  allText: {
    marginTop: -2,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
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
    backgroundColor: '#cdf7eb',
    marginTop: -2,
    borderRadius: 12,
    padding: 3,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#5c5c5c',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Map;
