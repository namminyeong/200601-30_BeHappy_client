import React, { Fragment } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Icon, Button } from 'native-base';
import Markers from './Markers';
import Details from './details/Details';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();
import GeoModalContainer from '../../containers/GeoModalContainer';
import MapModal from './MapModal';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myLatitude: 37.02,
      myLongitude: 127.17,
      modalMapShown: false,
    };

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.findCentersFromCurrentLocation = this.findCentersFromCurrentLocation.bind(
      this
    );
    this.goCurrentLocation = this.goCurrentLocation.bind(this);
    this.countSpecialties = this.countSpecialties.bind(this);
    this.checkSpecialtiesForUrl = this.checkSpecialtiesForUrl.bind(this);
    this.getBookmark = this.getBookmark.bind(this);
    this.deleteBookmarkState = this.deleteBookmarkState.bind(this);
    this.postBookmarkState = this.postBookmarkState.bind(this);
    this.postBookmark = this.postBookmark.bind(this);
    this.checkBookmark = this.checkBookmark.bind(this);
    this.goSpecificLocationAfterSearch = this.goSpecificLocationAfterSearch.bind(
      this
    );
    this.goToMarked = this.goToMarked.bind(this);
    this.filterMarkerBySpecialties = this.filterMarkerBySpecialties.bind(this);
    this.handleMapModalShows = this.handleMapModalShows.bind(this);
  }

  countSpecialties() {
    return Object.keys(this.props.specialties).reduce((acc, cur) => {
      if (this.props.specialties[cur]) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  componentDidMount() {
    this.props.controlShowDetail(false, null);

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        let myLatitude = location.coords.latitude;
        let myLongitude = location.coords.longitude;
        this._map.animateToRegion(
          {
            longitude: myLongitude,
            latitude: myLatitude,
            longitudeDelta: 0.03,
            latitudeDelta: 0.04,
          },
          20
        );
        this.setState({
          myLongitude,
          myLatitude,
        });
        this.props.controlCoordinate(myLongitude, myLatitude);
        this.findCentersFromCurrentLocation();
        this.getBookmark();
      }
    })();
  }

  checkSpecialtiesForUrl() {
    const { specialties } = this.props;
    let keys = Object.keys(specialties);
    if (this.countSpecialties() === keys.length) {
      return '';
    }
    let allSpecialties = keys.reduce((acc, cur) => {
      if (specialties[cur]) {
        acc.push(cur);
        return acc;
      }
      return acc;
    }, []);
    return '&tags='.concat(allSpecialties);
  }

  findCentersFromCurrentLocation() {
    const coordinate = this.props.coordinate;
    let specialties = this.checkSpecialtiesForUrl();
    let url =
      ec2 +
      '/search/location?radius=5000&latitude=' +
      coordinate[1] +
      '&longitude=' +
      coordinate[0] +
      specialties;
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
          if (counseling.length === 0 && psychiatric.length === 0) {
            this.handleMapModalShows(true);
          } else {
            this.props.controlCenterData(counseling, psychiatric);
          }
          this.props.controlShowDetail(false, null);
        }
      });
  }

  goCurrentLocation() {
    this._map.animateToRegion(
      {
        longitude: this.state.myLongitude,
        latitude: this.state.myLatitude,
        longitudeDelta: 0.03,
        latitudeDelta: 0.04,
      },
      200
    );
  }

  goSpecificLocationAfterSearch(region) {
    this._map.animateToRegion(region, 20);
  }

  onRegionChangeComplete(lon, lat, lonDelta, latDelta) {
    this.props.controlCoordinate(lon, lat, lonDelta, latDelta);
  }

  getBookmark() {
    fetch(ec2 + '/bookmark', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
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
          this.props.controlBookmark(data.centers.reverse());
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  checkBookmark(id) {
    let exist = false;
    let index;
    this.props.bookmark.forEach((ele, i) => {
      if (ele.id === id) {
        exist = true;
        index = i;
      }
    });
    return [exist, index];
  }

  postBookmark(method, centerId) {
    fetch(ec2 + '/bookmark', {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      },
      body: JSON.stringify({ centerId }),
    })
      .then((res) => {
        if (res.status === 200) {
          if (method === 'DELETE') {
            this.deleteBookmarkState(centerId);
          } else {
            return res.json();
          }
        }
      })
      .then((data) => {
        if (typeof data === 'object') {
          if (method === 'POST') {
            this.postBookmarkState(data);
          }
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  deleteBookmarkState(centerId) {
    let newBookmarkState = Object.assign([], this.props.bookmark);
    let index = this.checkBookmark(centerId)[1];
    newBookmarkState.splice(index, 1);
    this.props.controlBookmark(newBookmarkState);
  }

  postBookmarkState(centerInfo) {
    let newBookmarkState = Object.assign([], this.props.bookmark);
    newBookmarkState.unshift(centerInfo);
    this.props.controlBookmark(newBookmarkState);
  }

  goToMarked() {
    this.goSpecificLocationAfterSearch({
      latitude: this.props.coordinate[0],
      longitude: this.props.coordinate[1],
      longitudeDelta: this.props.coordinate[2],
      latitudeDelta: this.props.coordinate[3],
    });
    this.props.controlBookmarkClicked(false);
  }

  filterMarkerBySpecialties(centerInfo) {
    const { specialties } = this.props;
    let keys = Object.keys(specialties);
    let result = false;
    centerInfo.specialties.forEach((centerSpecialty) => {
      keys.forEach((specialtyFilter) => {
        if (
          centerSpecialty === specialtyFilter &&
          specialties[specialtyFilter]
        ) {
          result = true;
        }
      });
    });
    return result;
  }

  handleMapModalShows(status) {
    this.setState({
      modalMapShown: status,
    });
  }

  render() {
    this.props.bookmarkClicked ? this.goToMarked() : '';

    const { myLatitude, myLongitude } = this.state;
    const { centerTags, showDetailsIndex, showDetails } = this.props;
    return (
      <View style={{ width: '100%', height: '100%', flex: 1 }}>
        <View style={styles.searchContainer}>
          <Image
            source={require('../../assets/mini.png')}
            style={styles.logo}
          />
          <Button
            transparent
            style={styles.searchButton}
            onPress={() => {
              this.props.navigation.navigate('SearchNameContainer', {
                goSpecificLocationAfterSearch: this
                  .goSpecificLocationAfterSearch,
              });
            }}
          >
            <Icon active name='search' style={{ color: 'grey' }} />
            <Text style={styles.searchText}>검색어를 입력해주세요</Text>
          </Button>
          <SimpleLineIcons
            name='equalizer'
            size={24}
            style={styles.filter}
            onPress={() => {
              this.props.navigation.navigate('FilterContainer');
            }}
          />
        </View>

        <MapView
          toolbarEnabled={false}
          ref={(component) => (this._map = component)}
          style={styles.map}
          showsUserLocation={false}
          zoomEnabled={true}
          initialRegion={{
            latitude: myLatitude,
            longitude: myLongitude,
            latitudeDelta: 4,
            longitudeDelta: 4,
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
            this.props.controlShowDetail(false, null);
          }}
        >
          <Marker
            coordinate={{ latitude: myLatitude, longitude: myLongitude }}
            pinColor='#000000'
            image={require('../../assets/mylocation.png')}
          />

          {Object.keys(centerTags).map((center) =>
            centerTags[center] === true && this.props[center] ? (
              this.props[center].map((centerInfo, index) => {
                if (
                  this.countSpecialties() === 9 ||
                  this.filterMarkerBySpecialties(centerInfo) === true
                ) {
                  return (
                    <Markers
                      key={centerInfo.id}
                      index={index}
                      latitude={centerInfo.latitude}
                      longitude={centerInfo.longitude}
                      importance={centerInfo.importance}
                      center={center}
                      controlShowDetail={this.props.controlShowDetail}
                      name={centerInfo.centerName}
                    />
                  );
                }
              })
            ) : (
              <Fragment key='fragment' />
            )
          )}
        </MapView>
        {showDetails ? (
          <Details
            centerInfo={
              showDetailsIndex > this.props[showDetails].length - 1
                ? this.props[showDetails][0]
                : this.props[showDetails][showDetailsIndex]
            }
            navigation={this.props.navigation}
            bookmark={
              showDetailsIndex > this.props[showDetails].length - 1
                ? this.checkBookmark(this.props[showDetails][0].id)[0]
                : this.checkBookmark(
                    this.props[showDetails][showDetailsIndex].id
                  )[0]
            }
            postBookmark={this.postBookmark}
          />
        ) : (
          <></>
        )}

        <View style={styles.searchNowContainer}>
          <Button
            small
            transparent
            onPress={this.findCentersFromCurrentLocation}
          >
            <Text style={styles.searchNow}>현 위치에서 검색하기</Text>
          </Button>
        </View>
        <View
          style={
            showDetails !== false
              ? [styles.goCurrentLocation, styles.goCurrentLocationUp]
              : styles.goCurrentLocation
          }
        >
          <MaterialCommunityIcons
            name='crosshairs-gps'
            size={26}
            onPress={this.goCurrentLocation}
          />
        </View>
        {this.props.GeoModalShown ? <GeoModalContainer /> : <></>}
        <MapModal
          handleMapModalShows={this.handleMapModalShows}
          modalMapShown={this.state.modalMapShown}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    borderRadius: 5,
    alignSelf: 'center',
    height: '7%',
    flexDirection: 'row',
    backgroundColor: 'white',
    position: 'absolute',
    top: '4%',
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  logo: {
    alignSelf: 'center',
    width: '25%',
    height: '60%',
    left: '13%',
    marginLeft: '2%',
    marginRight: '4%',
  },
  searchButton: {
    backgroundColor: '#ebebeb',
    width: '55%',
    alignSelf: 'center',
    height: '70%',
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  searchText: {
    position: 'absolute',
    left: 45,
    color: 'grey',
  },
  filter: {
    alignSelf: 'center',
    left: '20%',
    transform: [{ rotate: '90deg' }],
  },
  map: {
    top: 0,
    flex: 1,
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
  searchNowContainer: {
    position: 'absolute',
    left: '4%',
    top: '12%',
    alignSelf: 'flex-start',
  },
  searchNow: {
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 15,
    color: 'black',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  goCurrentLocation: {
    backgroundColor: 'white',
    position: 'absolute',
    right: 15,
    bottom: 16,
    padding: 5,
    borderRadius: 20,
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  goCurrentLocationUp: {
    bottom: 155,
  },
});

export default Map;
