import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Header, Button, Icon, Item, Input, Container } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import getEnvVars from '../../environment';
const { ec2, kakaoApi } = getEnvVars();
import deviceStorage from '../../service/DeviceStorage';
import { StackActions } from '@react-navigation/native';

const cities = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '강원도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주특별자치도',
];

const states = {
  서울특별시: [
    '종로구',
    '중구',
    '용산구',
    '성동구',
    '광진구',
    '동대문구',
    '중랑구',
    '성북구',
    '강북구',
    '도봉구',
    '노원구',
    '은평구',
    '서대문구',
    '마포구',
    '양천구',
    '강서구',
    '구로구',
    '금천구',
    '영등포구',
    '동작구',
    '관악구',
    '서초구',
    '강남구',
    '송파구',
    '강동구',
  ],
  부산광역시: [
    '중구',
    '서구',
    '동구',
    '영도구',
    '부산진구',
    '동래구',
    '남구',
    '북구',
    '해운대구',
    '사하구',
    '금정구',
    '강서구',
    '연제구',
    '수영구',
    '사상구',
    '기장군',
  ],
  대구광역시: [
    '중구',
    '동구',
    '서구',
    '남구',
    '북구',
    '수성구',
    '달서구',
    '달성군',
  ],
  인천광역시: [
    '중구',
    '동구',
    '연수구',
    '남동구',
    '부평구',
    '계양구',
    '서구',
    '미추홀구',
    '강화군',
    '옹진군',
  ],
  광주광역시: ['옹진군', '동구', '서구', '남구', '북구', '광산구'],
  대전광역시: ['동구', '중구', '서구', '유성구', '대덕구'],
  울산광역시: ['중구', '남구', '동구', '북구', '울주군'],
  세종특별자치시: ['세종특별자치시'],
  경기도: [
    '수원시',
    '장안구',
    '권선구',
    '팔달구',
    '영통구',
    '성남시',
    '수정구',
    '중원구',
    '분당구',
    '의정부시',
    '안양시',
    '만안구',
    '동안구',
    '부천시',
    '광명시',
    '평택시',
    '동두천시',
    '안산시',
    '상록구',
    '단원구',
    '고양시',
    '덕양구',
    '일산동구',
    '일산서구',
    '과천시',
    '구리시',
    '남양주시',
    '오산시',
    '시흥시',
    '군포시',
    '의왕시',
    '하남시',
    '용인시',
    '처인구',
    '기흥구',
    '수지구',
    '파주시',
    '이천시',
    '안성시',
    '김포시',
    '화성시',
    '광주시',
    '양주시',
    '포천시',
    '여주시',
    '연천군',
    '가평군',
    '양평군',
  ],
  강원도: [
    '춘천시',
    '원주시',
    '강릉시',
    '동해시',
    '태백시',
    '속초시',
    '삼척시',
    '홍천군',
    '횡성군',
    '영월군',
    '평창군',
    '정선군',
    '철원군',
    '화천군',
    '양구군',
    '인제군',
    '고성군',
    '양양군',
  ],
  충청북도: [
    '충주시',
    '제천시',
    '청주시',
    '상당구',
    '서원구',
    '흥덕구',
    '청원구',
    '보은군',
    '옥천군',
    '영동군',
    '진천군',
    '괴산군',
    '음성군',
    '단양군',
    '증평군',
  ],
  충청남도: [
    '천안시',
    '동남구',
    '서북구',
    '공주시',
    '보령시',
    '아산시',
    '서산시',
    '논산시',
    '계룡시',
    '당진시',
    '금산군',
    '부여군',
    '서천군',
    '청양군',
    '홍성군',
    '예산군',
    '태안군',
  ],
  전라북도: [
    '전주시',
    '완산구',
    '덕진구',
    '군산시',
    '익산시',
    '정읍시',
    '남원시',
    '김제시',
    '완주군',
    '진안군',
    '무주군',
    '장수군',
    '임실군',
    '순창군',
    '고창군',
    '부안군',
  ],
  전라남도: [
    '목포시',
    '여수시',
    '순천시',
    '나주시',
    '광양시',
    '담양군',
    '곡성군',
    '구례군',
    '고흥군',
    '보성군',
    '화순군',
    '장흥군',
    '강진군',
    '해남군',
    '영암군',
    '무안군',
    '함평군',
    '영광군',
    '장성군',
    '완도군',
    '진도군',
    '신안군',
  ],
  경상북도: [
    '포항시',
    '남구',
    '북구',
    '경주시',
    '김천시',
    '안동시',
    '구미시',
    '영주시',
    '영천시',
    '상주시',
    '문경시',
    '경산시',
    '군위군',
    '의성군',
    '청송군',
    '영양군',
    '영덕군',
    '청도군',
    '고령군',
    '성주군',
    '칠곡군',
    '예천군',
    '봉화군',
    '울진군',
    '울릉군',
  ],
  경상남도: [
    '창원시',
    '의창구',
    '성산구',
    '마산합포구',
    '마산회원구',
    '진해구',
    '진주시',
    '통영시',
    '사천시',
    '김해시',
    '밀양시',
    '거제시',
    '양산시',
    '의령군',
    '함안군',
    '창녕군',
    '고성군',
    '남해군',
    '하동군',
    '산청군',
    '함양군',
    '거창군',
    '합천군',
  ],
  제주특별자치도: ['제주시', '서귀포시'],
};

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
        if (typeof data === 'object') {
          let lon = Number(data.documents[0].address.x).toFixed(6);
          let lat = Number(data.documents[0].address.y).toFixed(6);
          this.props.controlCoordinate(lon, lat);
        }
      });
    this.getCenterWithCoordinate();
  }

  getCenterWithCoordinate() {
    let url = ec2 + '/search/location';
    fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${deviceStorage.loadJWT()}`,
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
          this.goBack();
        }
      });
  }

  goBack() {
    this.props.navigation.dispatch(StackActions.popToTop());
    this.props.navigation.navigate('Map');
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
              <Button
                transparent
                onPress={() => {
                  alert(this.state.city);
                }}
              >
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
              items={cities.map((ele) => {
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
                items={states[this.state.city].sort().map((ele) => {
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
