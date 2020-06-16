import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Header, Button, Icon, Item, Input, Container } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import getEnvVars from '../../environment';
const { ec2, kakaoApi } = getEnvVars();
import { Cities, States } from '../../Data/Preference';

class SearchGeo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      state: '',
      citySelected: false,
      stateSelected: false,
    };
    this.inputCity = this.inputCity.bind(this);
    this.inputState = this.inputState.bind(this);
    this.selectCity = this.selectCity.bind(this);
    this.resetState = this.resetState.bind(this);
    this.getCoordinate = this.getCoordinate.bind(this);
    this.getCenterWithCoordinate = this.getCenterWithCoordinate.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  getCoordinate() {
    let url =
      'https://dapi.kakao.com/v2/local/search/address.json?query=' +
      this.state.city +
      ' ' +
      this.state.state;
    fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: kakaoApi,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return '';
      })
      .then((data) => {
        console.log('data', data);
        if (typeof data === 'object') {
          if (data.length === 0) {
            alert(
              '검색 결과가 없습니다, 다른 곳으로 이동하시거나 조금 더 확대하여 검색해보세요'
            );
            this.props.handleShowDetails(false, null);
          }
          let lon = parseFloat(data.documents[0].address.x).toFixed(6);
          let lat = parseFloat(data.documents[0].address.y).toFixed(6);
          this.getCenterWithCoordinate(lon, lat);
          this.props.navigation.state.params.goSpecificLocationAfterSearch({
            latitude: Number(lat),
            longitude: Number(lon),
            latitudeDelta: 0.06,
            longitudeDelta: 0.07,
          });
        }
      });
  }

  getCenterWithCoordinate(lon, lat) {
    let url =
      ec2 +
      '/search/location?radius=5000&latitude=' +
      lat +
      '&longitude=' +
      lon;
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
    this.goBack();
  }

  goBack() {
    this.props.navigation.navigate('MapContainer');
  }

  inputCity(value) {
    this.setState({
      city: value,
    });
    this.resetState();
    if (value !== null) {
      this.selectCity(true);
    } else {
      this.selectCity(false);
    }
  }

  resetState() {
    if (this.state.stateSelected === true) {
      this.inputState('');
      this.selectState(false);
    }
  }

  inputState(value) {
    this.setState({
      state: value,
    });
    if (value !== null) {
      this.selectState(true);
    } else {
      this.selectState(false);
    }
  }

  selectCity(status) {
    this.setState({
      citySelected: status,
    });
  }

  selectState(status) {
    this.setState({
      stateSelected: status,
    });
  }

  render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <Container style={styles.container}>
          <Header searchBar rounded style={{ backgroundColor: 'white' }}>
            <Item style={{ width: '80%' }}>
              <Icon active name='search' />
              <Button transparent>
                <Text style={{ fontSize: 17 }}>지역으로 검색 </Text>
              </Button>
            </Item>
          </Header>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              style={{
                inputAndroid: {
                  fontSize: 20,
                  marginBottom: 40,
                  textAlign: 'center',
                },
              }}
              placeholder={{ label: '지역을 선택해주세요', value: null }}
              onValueChange={(value) => this.inputCity(value)}
              onOpen={this.resetState}
              items={Cities.map((ele) => {
                return { label: `${ele}`, value: `${ele}` };
              })}
            />
            {this.state.citySelected ? (
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={{
                  inputAndroid: {
                    fontSize: 20,
                    marginBottom: 40,
                    textAlign: 'center',
                  },
                }}
                selectedValue={this.state.stateSelected}
                placeholder={{ label: '시/구/군을 선택해주세요', value: null }}
                value={this.state.state}
                onValueChange={(value) => this.inputState(value)}
                items={States[this.state.city].sort().map((ele) => {
                  return { label: `${ele}`, value: `${ele}` };
                })}
              />
            ) : (
              <Text />
            )}
          </View>
          {this.state.stateSelected ? (
            <Button style={styles.button} onPress={this.getCoordinate}>
              <Text>검색하기</Text>
            </Button>
          ) : (
            <Text />
          )}
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    textAlign: 'center',
  },
  pickerContainer: {
    marginTop: 30,
    color: 'black',
    marginLeft: 60,
    marginRight: 60,
    fontSize: 50,
  },
  button: {
    marginTop: 10,
    width: 300,
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default SearchGeo;
