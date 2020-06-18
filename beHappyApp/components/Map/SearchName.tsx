import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Header, Button, Icon, Item, Input, Container } from 'native-base';
import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();
import SearchGeoContainer from '../../containers/SearchGeoContainer';

class SearchName extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
    };
    this.inputKeyword = this.inputKeyword.bind(this);
    this.goBack = this.goBack.bind(this);
    this.getCenterWithKeyword = this.getCenterWithKeyword.bind(this);
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
          let keys = Object.keys(data);
          if (data.counseling.length + data.psychiatric.length === 0) {
            alert('검색 결과가 없습니다');
            this.props.controlShowDetail(false, null);
          } else if (data.counseling.length + data.psychiatric.length === 1) {
            if (data.counseling.length === 1) {
              this.props.goSpecificLocationAfterSearch({
                longitude: data.counseling[0].longitude,
                latitude: data.counseling[0].latitude,
                longitudeDelta: 0.03,
                latitudeDelta: 0.03,
              });
              this.props.controlShowDetail('counseling', 0);
            } else {
              this.props.goSpecificLocationAfterSearch({
                longitude: data.psychiatric[0].longitude,
                latitude: data.psychiatric[0].latitude,
                longitudeDelta: 0.03,
                latitudeDelta: 0.03,
              });
              this.props.controlShowDetail('psychiatric', 0);
            }
            this.goBack();
          } else {
            let lat = [];
            let lon = [];
            keys.map((key) => {
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
                  { maxLat: 33, minLat: 38.6 }
                )
              );
            });
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
                  { maxLon: 125, minLon: 131.4 }
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
              longitudeDelta: maxLon - minLon,
              latitudeDelta: maxLat - minLat + 2,
            });
          }
          this.props.controlCenterData(data.counseling, data.psychiatric);

          this.goBack();
        }
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
            <Text>지역으로 검색하려면</Text>
            <SearchGeoContainer
              goSpecificLocationAfterSearch={
                this.props.goSpecificLocationAfterSearch
              }
              goBack={this.goBack}
            />
          </View>
        </Container>
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
