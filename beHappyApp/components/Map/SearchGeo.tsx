import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'native-base';
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
      range: null,
    };
    this.inputCity = this.inputCity.bind(this);
    this.inputState = this.inputState.bind(this);
    this.selectCity = this.selectCity.bind(this);
    this.resetState = this.resetState.bind(this);
    this.getCoordinate = this.getCoordinate.bind(this);
    this.getCenterWithCoordinate = this.getCenterWithCoordinate.bind(this);
    this.inputRange = this.inputRange.bind(this);
  }

  componentDidUpdate() {
    if (this.state.state) {
      this.getCoordinate();
    }
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
        if (typeof data === 'object') {
          let lon = parseFloat(data.documents[0].address.x).toFixed(6);
          let lat = parseFloat(data.documents[0].address.y).toFixed(6);
          this.getCenterWithCoordinate(lon, lat);
          this.props.goSpecificLocationAfterSearch({
            latitude: Number(lat),
            longitude: Number(lon),
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
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
          if (counseling.length === 0 && psychiatric.length === 0) {
            alert('검색 결과가 없습니다, 다른 지역을 검색해보세요');
            this.props.controlShowDetail(false, null);
          }
          this.props.controlCenterData(counseling, psychiatric);
        }
      });
    this.props.goBack();
  }

  inputCity(city) {
    this.setState({
      city,
    });
    this.resetState();
    if (city !== null) {
      this.selectCity(true);
    } else {
      this.selectCity(false);
    }
  }

  resetState() {
    if (this.state.stateSelected === true) {
      this.inputState('');
      this.selectState(false);
      this.inputRange(null);
    }
  }

  inputRange(value) {
    this.setState({
      range: value,
    });
  }

  inputState(value) {
    if (value === 'ㄱ~ㅅ' || value === 'ㅇ~ㅎ') {
      this.inputRange(value);
    } else {
      this.setState({
        state: value,
      });
    }
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
      <View>
        <View style={styles.cities}>
          {Cities.map((city) => (
            <Button
              key={city}
              transparent
              style={styles.citiesBtn}
              onPress={() => this.inputCity(city)}
            >
              <Text
                style={
                  this.state.city !== city
                    ? styles.citiesText
                    : [styles.citiesText, styles.citiesTextSelcted]
                }
              >
                {city}
              </Text>
            </Button>
          ))}
        </View>
        <View style={styles.statesStart}>
          {this.state.citySelected ? (
            this.state.city !== '경기도' ? (
              <>
                <Text>시/군/구도 선택해주세요</Text>
                <View style={styles.states}>
                  {States[this.state.city].sort().map((state) => (
                    <Button
                      key={state}
                      transparent
                      style={styles.citiesBtn}
                      onPress={() => this.inputState(state)}
                    >
                      <Text
                        style={
                          this.state.state !== state
                            ? styles.citiesText
                            : [styles.citiesText, styles.citiesTextSelcted]
                        }
                      >
                        {state}
                      </Text>
                    </Button>
                  ))}
                </View>
              </>
            ) : (
              <>
                <Text>
                  선택하실 경기도 내의 시/군/구가 포함된 자음을 선택해주세요
                </Text>
                <View style={styles.states}>
                  <Button
                    key='before'
                    transparent
                    style={styles.citiesBtn}
                    onPress={() => this.inputState('ㄱ~ㅅ')}
                  >
                    <Text
                      style={
                        this.state.range !== 'ㄱ~ㅅ'
                          ? styles.citiesText
                          : [styles.citiesText, styles.citiesTextSelcted]
                      }
                    >
                      ㄱ~ㅅ
                    </Text>
                  </Button>
                  <Button
                    key='after'
                    transparent
                    style={styles.citiesBtn}
                    onPress={() => this.inputState('ㅇ~ㅎ')}
                  >
                    <Text
                      style={
                        this.state.range !== 'ㅇ~ㅎ'
                          ? styles.citiesText
                          : [styles.citiesText, styles.citiesTextSelcted]
                      }
                    >
                      ㅇ~ㅎ
                    </Text>
                  </Button>
                </View>
              </>
            )
          ) : (
            <></>
          )}
        </View>
        <View style={styles.statesStart}>
          {this.state.stateSelected && this.state.range ? (
            <>
              <Text>시/군/구를 선택해주세요</Text>
              <View style={styles.states}>
                {States[this.state.city]
                  .sort()
                  .filter((state) => {
                    let code = state.charCodeAt(0);
                    if (
                      this.state.range === 'ㄱ~ㅅ' &&
                      Number(code.toString().slice(0, 2)) <= 49
                    ) {
                      return true;
                    } else if (
                      this.state.range === 'ㅇ~ㅎ' &&
                      Number(code.toString().slice(0, 2)) > 49
                    ) {
                      return true;
                    }
                    return false;
                  })
                  .map((state) => {
                    return (
                      <Button
                        key={state}
                        transparent
                        style={styles.citiesBtn}
                        onPress={() => this.inputState(state)}
                      >
                        <Text
                          style={
                            this.state.state !== state
                              ? styles.citiesText
                              : [styles.citiesText, styles.citiesTextSelcted]
                          }
                        >
                          {state}
                        </Text>
                      </Button>
                    );
                  })}
              </View>
            </>
          ) : (
            <></>
          )}
        </View>
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  citiesBtn: {
    height: 40,
  },
  citiesText: {
    color: 'white',
    marginRight: 8,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#ababab',
  },
  citiesTextSelcted: {
    backgroundColor: '#62CCAD',
  },
  statesStart: {
    marginTop: 20,
  },
  states: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default SearchGeo;
