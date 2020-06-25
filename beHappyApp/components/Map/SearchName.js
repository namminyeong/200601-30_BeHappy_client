import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Header, Button, Icon, Item, Input, Container } from 'native-base';
import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();
import SearchGeoContainer from '../../containers/SearchGeoContainer';
import NameModal from './NameModal';

class SearchName extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      modalNameShown: false,
    };
    this.inputKeyword = this.inputKeyword.bind(this);
    this.goBack = this.goBack.bind(this);
    this.getCenterWithKeyword = this.getCenterWithKeyword.bind(this);
    this.handleModalNameShown = this.handleModalNameShown.bind(this);
    this.resetSpecialtiesAndCenters = this.resetSpecialtiesAndCenters.bind(
      this
    );
  }

  inputKeyword(value) {
    this.setState({
      keyword: value,
    });
  }

  getCenterWithKeyword() {
    let url = ec2 + '/search/name?keyword=' + this.state.keyword;

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
          if (data.counseling.length + data.psychiatric.length === 0) {
            this.handleModalNameShown(true);
            this.props.controlShowDetail(false, null);
          } else if (data.counseling.length + data.psychiatric.length === 1) {
            this.resetSpecialtiesAndCenters();
            if (data.counseling.length === 1) {
              this.props.goSpecificLocationAfterSearch({
                longitude: data.counseling[0].longitude,
                latitude: data.counseling[0].latitude,
                longitudeDelta: 0.03,
                latitudeDelta: 0.03,
              });
              this.props.controlShowDetail('counseling', 0);
              this.props.controlCenterData(data.counseling, []);
            } else {
              this.props.goSpecificLocationAfterSearch({
                longitude: data.psychiatric[0].longitude,
                latitude: data.psychiatric[0].latitude,
                longitudeDelta: 0.03,
                latitudeDelta: 0.03,
              });
              this.props.controlShowDetail('psychiatric', 0);
              this.props.controlCenterData([], data.psychiatric);
            }
            this.goBack();
          } else {
            let lat = [];
            let lon = [];
            let keys = Object.keys(data);
            this.resetSpecialtiesAndCenters();
            keys.map((key) => {
              lon.push(
                data[key].reduce(
                  (acc, cur) => {
                    if (cur.longitude > acc.maxLon) {
                      return Object.assign({}, acc, { maxLon: cur.longitude });
                    } else if (cur.longitude < acc.minLon) {
                      return Object.assign({}, acc, { minLon: cur.longitude });
                    }
                    return acc;
                  },
                  {
                    maxLon: data[key].length > 0 ? data[key][0].longitude : 125,
                    minLon: data[key].length > 0 ? data[key][0].longitude : 132,
                  }
                )
              );

              lat.push(
                data[key].reduce(
                  (acc, cur) => {
                    if (cur.latitude > acc.maxLat) {
                      return Object.assign({}, acc, { maxLat: cur.latitude });
                    } else if (cur.latitude < acc.minLat) {
                      return Object.assign({}, acc, { minLat: cur.latitude });
                    }
                    return acc;
                  },
                  {
                    maxLat: data[key].length > 0 ? data[key][0].latitude : 33,
                    minLat: data[key].length > 0 ? data[key][0].latitude : 39,
                  }
                )
              );
            });

            let maxLon = Math.max(lon[0].maxLon, lon[1].maxLon);
            let minLon = Math.min(lon[0].minLon, lon[1].minLon);
            let maxLat = Math.max(lat[0].maxLat, lat[1].maxLat);
            let minLat = Math.min(lat[0].minLat, lat[1].minLat);

            this.props.goSpecificLocationAfterSearch({
              longitude: (maxLon + minLon) / 2,
              latitude: (maxLat + minLat) / 2,
              longitudeDelta: (maxLon - minLon) * 1.2,
              latitudeDelta: (maxLat - minLat) * 1,
            });
            this.props.controlCenterData(data.counseling, data.psychiatric);
            this.props.controlShowDetail(false, null);
            this.goBack();
          }
        }
      });
  }

  resetSpecialtiesAndCenters() {
    let newSpecialties = {
      불면증: true,
      우울증: true,
      불안: true,
      가족: true,
      부부: true,
      아동·청소년: true,
      공황: true,
      중독: true,
      자해·자살: true,
    };
    this.props.controlSpecialties(newSpecialties);
    let newCenters = { psychiatric: true, counseling: true };
    this.props.controlCenterTags(newCenters);
  }

  handleModalNameShown(status) {
    this.setState({
      modalNameShown: status,
    });
  }

  goBack() {
    this.props.navigation.navigate('MapContainer');
  }

  render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <Container style={styles.container}>
          <Header searchBar rounded style={{ backgroundColor: 'white' }}>
            <Item style={{ width: '80%' }}>
              <Icon active name='search' />
              <Input
                onChangeText={(e) => {
                  this.inputKeyword(e);
                }}
                placeholder='검색어를 입력해주세요'
              />
              <Button
                transparent
                style={styles.button}
                onPress={this.getCenterWithKeyword}
              >
                <Text style={styles.search}>Search</Text>
              </Button>
            </Item>
          </Header>

          <View style={styles.geoSearch}>
            <SearchGeoContainer
              goSpecificLocationAfterSearch={
                this.props.goSpecificLocationAfterSearch
              }
              goBack={this.goBack}
            />
          </View>
        </Container>
        <NameModal
          modalNameShown={this.state.modalNameShown}
          handleModalNameShown={this.handleModalNameShown}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  geoSearch: {
    padding: 20,
  },
  button: {
    width: 80,
  },
  search: {
    left: 10,
    fontSize: 17,
  },
});

export default SearchName;
