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
import Icon from 'react-native-vector-icons/Ionicons';

import getEnvVars from '../../environment';
import AddressModal from './AddressModal';
const { ec2, kakaoApi } = getEnvVars();
import { Cities, States } from '../../Data/Preference';

const checkUsername = /^[a-z|A-Z|0-9]+$/;
const checkPassword = /^[a-z|A-Z|0-9]{8,20}$/;
const checkNickname = /^[ㄱ-ㅎ|가-힣]+$/;
const checkPhone = /^[0-9]{10,11}$/;
const checkBusinessNumbere = /^[0-9]{10,10}$/;

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
      showPass: true,
      press: false,
      showView: false,
    };

    this.changeModalVisible = this.changeModalVisible.bind(this);
    this.showPass = this.showPass.bind(this);
    this.showView = this.showView.bind(this);
    this.userSignup = this.userSignup.bind(this);
    this.centerSignup = this.centerSignup.bind(this);
    this.selectCity = this.selectCity.bind(this);
    this.inputCity = this.inputCity.bind(this);
    this.selectState = this.selectState.bind(this);
    this.inputState = this.inputState.bind(this);
    this.resetState = this.resetState.bind(this);
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

  showPass() {
    if (this.state.press === false) {
      this.setState({
        showPass: false,
        press: true,
      });
    } else {
      this.setState({
        showPass: true,
        press: false,
      });
    }
  }

  showView(status) {
    this.setState({
      showView: status,
    });
  }

  userSignup() {
    const { username, password, nickname, phone } = this.state;
    if (username === '') {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '아이디를 입력해주세요.',
      });
    } else if (password === '') {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '비밀번호를 입력해주세요.',
      });
    } else if (password.length < 8) {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '비밀번호는 8~20자리로 입력해주세요.',
      });
    } else if (nickname === '') {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '성함을 입력해주세요.',
      });
    } else if (phone === '') {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '연락처를 입력해주세요.',
      });
    } else if (phone.length < 10 || phone.length > 11) {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '연락처를 확인해주세요.',
      });
    } else {
      fetch(ec2 + '/user/signup', {
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
                showAlertModalText: '이미 존재하는 아이디입니다.',
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
        showAlertModalText: '아이디를 입력해주세요.',
      });
    } else if (password === '') {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '비밀번호를 입력해주세요.',
      });
    } else if (password.length < 8) {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '비밀번호는 8~20자리로 입력해주세요.',
      });
    } else if (businessNumber === '') {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '사업자 번호를 입력해주세요.',
      });
    } else if (businessNumber.length !== 10) {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '사업자 번호를 확인해주세요.',
      });
    } else if (centerName === '') {
      this.setState({
        showAlertModal: true,
        showAlertModalText: '주소를 검색해주세요.',
      });
    } else {
      fetch(ec2 + '/user/signup/center', {
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
                showAlertModalText: '이미 존재하는 아이디입니다.',
              });
            } else if (payload.errorCode === 4 || payload.errorCode === 5) {
              this.setState({
                showAlertModal: true,
                showAlertModalText: '이미 가입되어 있습니다.',
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
    if (value) {
      this.selectCity(true);
    } else {
      this.selectCity(false);
      this.resetState();
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
      value,
      city,
      state,
      businessNumber,
      addressName,
      roadAddressName,
      centerInfo,
      isModalVisible,
      showAlertModal,
      showAlertModalText,
      showPass,
      press,
      showView,
    } = this.state;

    const radio_props = [
      { label: '일반 사용자    ', value: 0 },
      { label: '심리상담소/정신과', value: 1 },
    ];

    return (
      <View style={styles.container}>
        <View style={styles.regform}>
          <Text style={styles.header}>회원가입</Text>
          <View style={styles.radioForm}>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              formHorizontal={true}
              buttonSize={12}
              onPress={(value) => {
                this.setState({ value: value });
              }}
            />
          </View>
          {value === 0 ? (
            <Fragment>
              <View style={styles.inputcontainer}>
                <Icon
                  style={styles.inputIcon}
                  name={'ios-person'}
                  size={28}
                  color={'rgba(0,0,0,0.7)'}
                />
                <TextInput
                  style={styles.inputBox}
                  underlineColorAndroid={'transparent'}
                  placeholder='아이디'
                  placeholderTextColor={'gray'}
                  onChangeText={(username) => this.setState({ username })}
                />
                {username === '' || checkUsername.test(username) ? null : (
                  <Text style={{ color: '#941818', left: 30, marginTop: 5 }}>
                    영문하고 숫자만 입력해주세요.
                  </Text>
                )}
              </View>
              <View style={styles.inputcontainer}>
                <Icon
                  style={styles.inputIcon}
                  name={'ios-lock'}
                  size={28}
                  color={'rgba(0,0,0,0.7)'}
                />
                <TextInput
                  style={styles.inputBox}
                  underlineColorAndroid={'transparent'}
                  placeholder='비밀번호'
                  secureTextEntry={showPass}
                  placeholderTextColor={'gray'}
                  onChangeText={(password) => this.setState({ password })}
                />
                <TouchableOpacity style={styles.btnEye} onPress={this.showPass}>
                  <Icon
                    name={press === true ? 'ios-eye' : 'ios-eye-off'}
                    size={26}
                    color={'rgba(0,0,0,0.7)'}
                  />
                </TouchableOpacity>
                {password === '' || checkPassword.test(password) ? null : (
                  <Text style={{ color: '#941818', left: 30, marginTop: 5 }}>
                    비밀번호는 8~20자리로 입력해주세요.
                  </Text>
                )}
              </View>
              <View style={styles.inputcontainer}>
                <Icon
                  style={styles.inputIcon}
                  name={'ios-pricetag'}
                  size={28}
                  color={'rgba(0,0,0,0.7)'}
                />
                <TextInput
                  style={styles.inputBox}
                  underlineColorAndroid={'transparent'}
                  placeholder='성함'
                  placeholderTextColor={'gray'}
                  onChangeText={(nickname) => this.setState({ nickname })}
                />
                {nickname === '' || checkNickname.test(nickname) ? null : (
                  <Text style={{ color: '#941818', left: 30, marginTop: 5 }}>
                    한글만 입력해주세요.
                  </Text>
                )}
              </View>
              <View style={styles.inputcontainer}>
                <Icon
                  style={styles.inputIcon}
                  name={'ios-phone-portrait'}
                  size={28}
                  color={'rgba(0,0,0,0.7)'}
                />
                <TextInput
                  style={styles.inputBox}
                  underlineColorAndroid={'transparent'}
                  placeholder='연락처'
                  placeholderTextColor={'gray'}
                  onChangeText={(phone) => this.setState({ phone })}
                />
                {phone === '' || checkPhone.test(phone) ? null : (
                  <Text style={{ color: '#941818', left: 30, marginTop: 5 }}>
                    연락처를 확인해주세요.
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={this.userSignup}
              >
                <Text style={styles.btnText}>회원 가입 완료</Text>
              </TouchableOpacity>
            </Fragment>
          ) : (
            <Fragment>
              <View style={styles.inputcontainer}>
                <Icon
                  style={styles.inputIcon}
                  name={'ios-person'}
                  size={28}
                  color={'rgba(0,0,0,0.7)'}
                />
                <TextInput
                  style={styles.inputBox}
                  underlineColorAndroid={'transparent'}
                  placeholder='아이디'
                  placeholderTextColor={'gray'}
                  onChangeText={(username) => this.setState({ username })}
                />
                {username === '' || checkUsername.test(username) ? null : (
                  <Text style={{ color: '#941818', left: 30, marginTop: 5 }}>
                    영문하고 숫자만 입력해주세요.
                  </Text>
                )}
              </View>
              <View style={styles.inputcontainer}>
                <Icon
                  style={styles.inputIcon}
                  name={'ios-lock'}
                  size={28}
                  color={'rgba(0,0,0,0.7)'}
                />
                <TextInput
                  style={styles.inputBox}
                  underlineColorAndroid={'transparent'}
                  placeholder='비밀번호'
                  secureTextEntry={showPass}
                  placeholderTextColor={'gray'}
                  onChangeText={(password) => this.setState({ password })}
                />
                <TouchableOpacity style={styles.btnEye} onPress={this.showPass}>
                  <Icon
                    name={press === true ? 'ios-eye' : 'ios-eye-off'}
                    size={26}
                    color={'rgba(0,0,0,0.7)'}
                  />
                </TouchableOpacity>
                {password === '' || checkPassword.test(password) ? null : (
                  <Text style={{ color: '#941818', left: 30, marginTop: 5 }}>
                    비밀번호는 8~20자리로 입력해주세요.
                  </Text>
                )}
              </View>
              <View style={styles.inputcontainer}>
                <Icon
                  style={styles.inputIcon}
                  name={'ios-document'}
                  size={28}
                  color={'rgba(0,0,0,0.7)'}
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
                {businessNumber === '' ||
                checkBusinessNumbere.test(businessNumber) ? null : (
                  <Text style={{ color: '#941818', left: 30, marginTop: 5 }}>
                    사업자 번호를 확인해주세요.
                  </Text>
                )}
              </View>
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
                  {this.state.citySelected === true &&
                  this.state.stateSelected === true ? (
                    <TouchableHighlight
                      onPress={() => this.changeModalVisible(true)}
                    >
                      <Text style={styles.searchAddress}>주소 찾기</Text>
                    </TouchableHighlight>
                  ) : (
                    <Text style={styles.notSearchAddress}>주소 찾기</Text>
                  )}
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
                      showView={this.showView}
                    />
                  </Modal>
                </View>
              </View>

              {showView === false ? (
                <View />
              ) : (
                <View style={styles.selectedCity}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      marginBottom: 5,
                    }}
                  >
                    {centerName}
                  </Text>
                  <Text style={styles.selectedCityText}>
                    지번 주소: {addressName}
                  </Text>
                  <Text style={styles.selectedCityText}>
                    도로명 주소: {roadAddressName}
                  </Text>
                  <Text style={styles.selectedCityText}>전화번호: {phone}</Text>
                </View>
              )}
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={this.centerSignup}
              >
                <Text style={styles.btnText}>회원 가입 완료</Text>
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
    backgroundColor: 'white',
    paddingLeft: 60,
    paddingRight: 60,
  },
  regform: {
    height: '85%',
    marginTop: 20,
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
  inputIcon: {
    position: 'absolute',
  },
  inputcontainer: {
    marginBottom: 25,
  },
  inputBox: {
    alignSelf: 'stretch',
    height: 30,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
    paddingLeft: 35,
  },
  btnEye: {
    position: 'absolute',
    right: 5,
  },
  selectedCity: {
    flex: 1,
    marginTop: 20,
    position: 'relative',
  },
  selectedCityText: {
    marginBottom: 5,
  },
  submitBtn: {
    backgroundColor: '#62CCAD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 30,
    borderRadius: 25,
    height: 40,
  },
  btnText: {
    fontSize: 16,
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
  },
  pickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    fontSize: 50,
  },
  searchBtnContainer: {
    justifyContent: 'center',
  },
  searchAddress: {
    backgroundColor: 'white',
    fontSize: 15,
    marginVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  notSearchAddress: {
    backgroundColor: 'white',
    color: 'lightgrey',
    fontSize: 15,
    marginVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    paddingVertical: 3,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
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
