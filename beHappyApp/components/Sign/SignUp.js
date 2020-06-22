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
import { Cities, States } from '../../Data/Preference';

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
      showAlertModal: false,
      showAlertModalText: '',
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
      this.setState({
        showAlertModal: true,
        showAlertModalText: 'username을 입력해주세요.',
      });
    } else if (password === '') {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '비밀번호를 입력해주세요.',
      });
    } else if (password.length < 8) {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '비밀번호는 8자리 이상이어야 합니다.',
      });
    } else if (nickname === '') {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '닉네임을 입력해주세요.',
      });
    } else if (phone === '') {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '핸드폰 번호를 입력해주세요.',
      });
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
              this.setState({
                showAlertModal: true,
                showAlertModalText: '회원가입에 성공했습니다.',
              });
              this.props.navigation.navigate('UserPreference', {
                userId: payload.userId,
              });
            } else if (payload.errorCode === 3) {
              this.setState({
                showAlertModal: true,
                showAlertModalText: '이미 존재하는 username입니다.',
              });
            }
          }
        })
        .catch((err) => {
          this.setState({
            showAlertModal: true,
            showAlertModalText:
              '회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.',
          });
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
      this.setState({
        showAlertModal: true,
        showAlertModalText: 'username을 입력해주세요.',
      });
    } else if (password === '') {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '비밀번호를 입력해주세요.',
      });
    } else if (password.length < 8) {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '비밀번호는 8자리 이상이어야 합니다.',
      });
    } else if (businessNumber === '') {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '사업자 번호를 입력해주세요.',
      });
    } else if (centerName === '') {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '주소를 검색해주세요.',
      });
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
              this.setState({
                showAlertModal: true,
                showAlertModalText: '회원가입에 성공했습니다.',
              });
              this.props.navigation.navigate('SpecialtyPreference', {
                centerId: payload.centerId,
              });
            } else if (payload.errorCode === 3) {
              this.setState({
                showAlertModal: true,
                showAlertModalText: '이미 존재하는 username입니다.',
              });
            } else if (payload.errorCode === 4) {
              this.setState({
                showAlertModal: true,
                showAlertModalText: '이미 존재하는 center입니다.',
              });
            } else if (payload.errorCode === 5) {
              this.setState({
                showAlertModal: true,
                showAlertModalText: '이미 존재하는 사업자 번호입니다.',
              });
            }
          }
        })
        .catch((err) => {
          this.setState({
            showAlertModal: true,
            showAlertModalText:
              '회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.',
          });
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
      phone,
      centerName,
      value,
      city,
      state,
      addressName,
      roadAddressName,
      centerInfo,
      isModalVisible,
      showAlertModal,
      showAlertModalText,
    } = this.state;

    const radio_props = [
      { label: '일반 사용자', value: 0 },
      { label: 'center 사용자', value: 1 },
    ];

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
                    items={Cities.map((ele) => {
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
                      items={States[city].sort().map((ele) => {
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
                      items={[
                        { label: `먼저 지역을 선택해주세요.`, value: `` },
                      ]}
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
        <Modal animationType='none' transparent={true} visible={showAlertModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{showAlertModalText}</Text>

              <TouchableHighlight
                style={styles.closeButton}
                onPress={() =>
                  this.setState({
                    showAlertModal: false,
                    showAlertModalText: '',
                  })
                }
              >
                <Text style={styles.textStyle}>닫기</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    top: '33%',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 35,
    paddingHorizontal: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: '#62CCAD',
    borderRadius: 2,
    paddingHorizontal: 13,
    paddingVertical: 5,
    elevation: 2,
  },
  modalText: {
    fontSize: 17,
    marginBottom: 20,
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
