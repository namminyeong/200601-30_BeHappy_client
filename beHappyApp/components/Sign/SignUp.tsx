import React, { Fragment } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';
import getEnvVars from '../../environment';

import AddressModal from './AddressModal';

const { ec2, kakaoApi } = getEnvVars();

let radio_props = [
  { label: '일반 사용자', value: 0 },
  { label: 'center 사용자', value: 1 },
];

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

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      nickname: '',
      phone: '',
      centerName: '',
      businessNumber: '',
      latitude: 0,
      longitude: 0,
      addressName: '',
      roadAddressName: '',
      value: 0,
      city: '',
      state: '',
      citySelected: false,
      stateSelecdted: false,
      centerSelected: false,
      centerInfo: [],
      isModalVisible: false,
    };

    this.changeModalVisible = this.changeModalVisible.bind(this);
    this.userSignup = this.userSignup.bind(this);
    this.centerSignup = this.centerSignup.bind(this);
    this.selectCity = this.selectCity.bind(this);
    this.inputCity = this.inputCity.bind(this);
    this.selectState = this.selectState.bind(this);
    this.inputState = this.inputState.bind(this);
    this.resetState = this.resetState.bind(this);
    this.goBack = this.goBack.bind(this);
    this.getCoordinate = this.getCoordinate.bind(this);
    this.getCenterInfo = this.getCenterInfo.bind(this);
    this.setPhone = this.setPhone.bind(this);
    this.setLatitude = this.setLatitude.bind(this);
    this.setLongitude = this.setLongitude.bind(this);
    this.setAddressName = this.setAddressName.bind(this);
    this.setRoadAddressName = this.setRoadAddressName.bind(this);
    this.selectCenter = this.selectCenter.bind(this);
    this.setCenterName = this.setCenterName.bind(this);
  }

  changeModalVisible(bool) {
    this.setState({
      isModalVisible: bool,
    });
  }

  goBack() {
    this.props.navigation.navigate('LoginContainer');
  }

  userSignup() {
    const { username, password, nickname, phone } = this.state;
    if (username === '') {
      alert('username을 입력해주세요.');
    } else if (password === '') {
      alert('비밀번호를 입력해주세요.');
    } else if (password.length < 8) {
      alert('비밀번호는 8자리 이상이어야 합니다.');
    } else if (nickname === '') {
      alert('닉네임을 입력해주세요.');
    } else if (phone === '') {
      alert('핸드폰 번호를 입력해주세요.');
    } else {
      fetch('http://13.209.16.103:4000/user/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, nickname, phone }),
      })
        .then((res) => {
          if (res.status === 200 || res.status === 409) {
            return res.json();
          }
          return '';
        })
        .then((payload) => {
          if (typeof payload === 'object') {
            if (!payload.errorCode) {
              alert('회원가입에 성공했습니다.');
              this.props.navigation.navigate('UserPreference', {
                userId: payload.userId,
              });
            } else if (payload.errorCode === 3) {
              alert('이미 존재하는 username입니다.');
            }
          }
        })
        .catch((err) => {
          alert('회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        });
    }
  }

  centerSignup() {
    const {
      username,
      password,
      latitude,
      longitude,
      centerName,
      phone,
      businessNumber,
      addressName,
      roadAddressName,
    } = this.state;

    if (username === '') {
      alert('username을 입력해주세요.');
    } else if (password === '') {
      alert('비밀번호를 입력해주세요.');
    } else if (password.length < 8) {
      alert('비밀번호는 8자리 이상이어야 합니다.');
    } else if (businessNumber === '') {
      alert('사업자 번호를 입력해주세요.');
    } else if (centerName === '') {
      alert('주소를 검색해주세요.');
    } else {
      fetch('http://13.209.16.103:4000/user/signup/center', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          latitude,
          longitude,
          centerName,
          phone,
          businessNumber,
          addressName,
          roadAddressName,
        }),
      })
        .then((res) => {
          if (res.status === 200 || res.status === 409) {
            return res.json();
          }
          return '';
        })
        .then((payload) => {
          if (typeof payload === 'object') {
            if (!payload.errorCode) {
              alert('회원가입에 성공했습니다.');
              this.props.navigation.navigate('SpecialtyPreference', {
                centerId: payload.centerId,
              });
            } else if (payload.errorCode === 3) {
              alert('이미 존재하는 username입니다.');
            } else if (payload.errorCode === 4) {
              alert('이미 존재하는 center입니다.');
            } else if (payload.errorCode === 5) {
              alert('이미 존재하는 사업자 번호입니다.');
            }
          }
        })
        .catch((err) => {
          alert('회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        });
    }
  }

  getCenterInfo(lat, lon) {
    return new Promise((resolve, reject) => {
      fetch(ec2 + `/search?latitude=${lat}1&longitude=${lon}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  }

  getCoordinate() {
    let url =
      'https://dapi.kakao.com/v2/local/search/address.json?query=' +
      this.state.city +
      ' ' +
      this.state.state;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: kakaoApi,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return '';
      })
      .then(async (data) => {
        if (typeof data === 'object') {
          let lon = Number(data.documents[0].address.x).toFixed(6);
          let lat = Number(data.documents[0].address.y).toFixed(6);

          const info = await this.getCenterInfo(lat, lon);
          this.setState({
            centerInfo: info,
          });
          this.selectCenter(true);
        }
      });
  }

  selectCity(status) {
    this.setState({
      citySelected: status,
    });
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

  selectState(status) {
    this.setState({
      stateSelected: status,
    });
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

  resetState() {
    if (this.state.stateSelecdted === true) {
      this.inputState('');
      this.selectState(false);
    }
  }

  selectCenter(status) {
    this.setState({
      centerSelected: status,
    });
  }

  setCenterName(centerName) {
    this.setState({
      centerName: centerName,
    });
  }

  setPhone(phone) {
    this.setState({
      phone: phone,
    });
  }

  setLatitude(lat) {
    this.setState({
      latitude: Number(lat).toFixed(6),
    });
  }

  setLongitude(lon) {
    this.setState({
      longitude: Number(lon).toFixed(6),
    });
  }

  setAddressName(addressName) {
    this.setState({
      addressName: addressName,
    });
  }

  setRoadAddressName(roadAddressName) {
    this.setState({
      roadAddressName: roadAddressName,
    });
  }

  render() {
    const {
      username,
      password,
      nickname,
      phone,
      centerName,
      businessNumber,
      latitude,
      longitude,
      value,
      city,
      state,
      addressName,
      roadAddressName,
      centerInfo,
      isModalVisible,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.regform}>
          <Text style={styles.header}>Registration</Text>
          <View style={styles.radioForm}>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              formHorizontal={false}
              labelHorizontal={true}
              buttonSize={12}
              onPress={(value) => {
                this.setState({ value: value });
              }}
            />
          </View>
          {value === 0 ? (
            <Fragment>
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholder='username'
                placeholderTextColor={'gray'}
                onChangeText={(username) => this.setState({ username })}
              />
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholder='password'
                secureTextEntry={true}
                placeholderTextColor={'gray'}
                onChangeText={(password) => this.setState({ password })}
              />
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholder='nickname'
                placeholderTextColor={'gray'}
                onChangeText={(nickname) => this.setState({ nickname })}
              />
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholder='phone'
                placeholderTextColor={'gray'}
                onChangeText={(phone) => this.setState({ phone })}
              />
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={this.userSignup}
              >
                <Text style={styles.btnText}>회원 가입</Text>
              </TouchableOpacity>
            </Fragment>
          ) : (
            <Fragment>
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholder='username'
                placeholderTextColor={'gray'}
                onChangeText={(username) => this.setState({ username })}
              />
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholder='password'
                secureTextEntry={true}
                placeholderTextColor={'gray'}
                onChangeText={(password) => this.setState({ password })}
              />
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholder='사업자 번호'
                placeholderTextColor={'gray'}
                onChangeText={(businessNumber) =>
                  this.setState({ businessNumber })
                }
              />
              <View style={styles.searchContainer}>
                <View style={styles.pickerContainer}>
                  <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={{
                      inputAndroid: {
                        width: 200,
                        height: 30,
                        fontSize: 16,
                        textAlign: 'center',
                        color: 'black',
                        paddingRight: 35,
                        marginVertical: 10,
                      },
                    }}
                    placeholder={{ label: '지역 선택', value: '' }}
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
                          width: 200,
                          height: 30,
                          fontSize: 16,
                          textAlign: 'center',
                          color: 'black',
                          paddingRight: 35,
                          marginVertical: 10,
                        },
                      }}
                      selectedValue={this.state.stateSelected}
                      placeholder={{
                        label: '시/구/군 선택',
                        value: '',
                      }}
                      value={state}
                      onValueChange={(value) => this.inputState(value)}
                      items={states[city].sort().map((ele) => {
                        return { label: `${ele}`, value: `${ele}` };
                      })}
                    />
                  ) : (
                    <RNPickerSelect
                      useNativeAndroidPickerStyle={false}
                      style={{
                        inputAndroid: {
                          width: 200,
                          height: 30,
                          fontSize: 16,
                          textAlign: 'center',
                          color: 'black',
                          paddingRight: 35,
                          marginVertical: 10,
                        },
                      }}
                      placeholder={{
                        label: '시/구/군 선택',
                        value: '',
                      }}
                      onValueChange={(value) => this.inputState(value)}
                      items={[{ label: ``, value: `` }]}
                    />
                  )}
                </View>
                <View style={styles.searchBtnContainer}>
                  <TouchableHighlight
                    style={styles.searchAddress}
                    onPress={() => this.changeModalVisible(true)}
                  >
                    <Text style={{ color: 'white' }}>주소 찾기</Text>
                  </TouchableHighlight>
                  <Modal
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => this.changeModalVisible(false)}
                    animationType='fade'
                  >
                    <AddressModal
                      changeModalVisible={this.changeModalVisible}
                      getCoordinate={this.getCoordinate}
                      centerInfo={centerInfo}
                      setPhone={this.setPhone}
                      setLatitude={this.setLatitude}
                      setLongitude={this.setLongitude}
                      setAddressName={this.setAddressName}
                      setRoadAddressName={this.setRoadAddressName}
                      selectCenter={this.selectCenter}
                      setCenterName={this.setCenterName}
                    />
                  </Modal>
                </View>
              </View>

              <View style={styles.selectedCity}>
                <Text style={styles.selectedCityText}>
                  센터 이름: {centerName}
                </Text>
                <Text style={styles.selectedCityText}>
                  지번 주소: {addressName}
                </Text>
                <Text style={styles.selectedCityText}>
                  도로명 주소: {roadAddressName}
                </Text>
                <Text style={styles.selectedCityText}>전화번호: {phone}</Text>
              </View>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={this.centerSignup}
              >
                <Text style={styles.btnText}>회원 가입</Text>
              </TouchableOpacity>
            </Fragment>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 60,
    paddingRight: 60,
  },
  regform: {
    height: 600,
    alignSelf: 'stretch',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  radioForm: {
    marginBottom: 30,
  },
  inputBox: {
    alignSelf: 'stretch',
    height: 30,
    marginBottom: 30,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  selectedCity: {
    flex: 1,
    marginTop: 20,
  },
  selectedCityText: {
    marginBottom: 5,
  },
  submitBtn: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#62CCAD',
    marginTop: 30,
  },
  btnText: {
    fontSize: 16,
    color: 'white',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  pickerContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    fontSize: 50,
  },
  searchBtnContainer: {
    justifyContent: 'center',
  },
  searchAddress: {
    width: 80,
    height: 30,
    backgroundColor: '#62CCAD',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
