import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Cities, States, SpecialtiesArray } from '../../Data/Preference';

import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();

class UserPreference extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.route.params.userId,
      city: '',
      state: '',
      citySelected: false,
      stateSelecdted: false,
      favorCity: '',
      favorCenter: [],
      specialties: [],
      favorCenterData: ['정신과', '심리센터'],
      showAlertModal: false,
      showAlertModalText: '',
    };

    this.submitPreference = this.submitPreference.bind(this);
    this.selectCity = this.selectCity.bind(this);
    this.inputCity = this.inputCity.bind(this);
    this.selectState = this.selectState.bind(this);
    this.inputState = this.inputState.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleCenters = this.handleCenters.bind(this);
    this.handleSpecialty = this.handleSpecialty.bind(this);
    this.inputFavorCity = this.inputFavorCity.bind(this);
  }

  submitPreference() {
    const { userId, specialties, favorCenter, favorCity } = this.state;
    let kindOfCenters = favorCenter;
    let city = favorCity;

    fetch(ec2 + '/preference', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, specialties, kindOfCenters, city }),
    })
      .then((res) => {
        if (res.status === 200) {
          this.props.navigation.navigate('LoginContainer');
        }
      })
      .catch((error) => {
        console.log('error: ', error);
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

  handleSpecialty(value) {
    const { specialties } = this.state;
    if (specialties.indexOf(value) === -1) {
      this.setState({
        specialties: [...specialties, value],
      });
    } else {
      this.setState({
        specialties: specialties.filter((specialty) => specialty !== value),
      });
    }
  }

  inputFavorCity() {
    this.setState({
      favorCity: this.state.city + ' ' + this.state.state,
    });
  }

  handleCenters(value) {
    const { favorCenter } = this.state;
    if (favorCenter.indexOf(value) === -1) {
      this.setState({
        favorCenter: [...favorCenter, value],
      });
    } else {
      this.setState({
        favorCenter: favorCenter.filter((specialty) => specialty !== value),
      });
    }
  }

  deletefavorCenterData(value) {
    const { favorCenterData } = this.state;

    this.setState({
      favorCenterData: favorCenterData.filter((center) => center !== value),
    });
  }

  render() {
    const {
      city,
      state,
      favorCity,
      favorCenter,
      favorCenterData,
      specialties,
    } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.preference}>
            <Text style={styles.section}>선호도 조사</Text>
            <Text style={{ marginTop: '2%' }}>
              * 아래의 내용을 바탕으로 상담소를 사용자의 관심사에 따라 추천하는
              순서대로 빨간색-주황색-노란색으로 표시합니다.
            </Text>
            <Text style={styles.preSection}>관심 분야</Text>
            <View style={styles.attention}>
              {SpecialtiesArray.map((data, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.handleSpecialty(data)}
                >
                  <Text
                    style={
                      specialties.indexOf(data) === -1
                        ? styles.notSelected
                        : styles.selected
                    }
                  >
                    #{data}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.preSection}>관심 지역</Text>
            <View>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={{
                  inputAndroid: {
                    fontSize: 17,
                    textAlign: 'center',
                  },
                }}
                placeholder={{ label: '지역을 선택해주세요', value: '' }}
                onValueChange={(value) => this.inputCity(value)}
                onOpen={this.resetState}
                items={Cities.map((ele) => {
                  return { label: `${ele}`, value: `${ele}` };
                })}
              />
              {this.state.citySelected ? (
                <View style={{ marginVertical: 10 }}>
                  <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={{
                      inputAndroid: {
                        fontSize: 17,
                        textAlign: 'center',
                      },
                    }}
                    selectedValue={this.state.stateSelected}
                    placeholder={{
                      label: '시/구/군을 선택해주세요',
                      value: '',
                    }}
                    value={state}
                    onValueChange={(value) => this.inputState(value)}
                    items={States[city].sort().map((ele) => {
                      return { label: `${ele}`, value: `${ele}` };
                    })}
                  />
                </View>
              ) : (
                <Text />
              )}
            </View>
            {this.state.citySelected ? (
              <TouchableOpacity
                onPress={this.inputFavorCity}
                style={{ alignSelf: 'center' }}
              >
                <Text style={styles.add}>선택</Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}

            {favorCity ? (
              <Text style={styles.citySelected}>{favorCity}</Text>
            ) : (
              <View />
            )}

            <Text style={styles.preSection}>선호센터</Text>
            <View style={styles.favor}>
              {favorCenterData.map((center, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.handleCenters(center)}
                >
                  <Text
                    style={
                      favorCenter.indexOf(center) === -1
                        ? styles.notSelected
                        : styles.selected
                    }
                  >
                    {center}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => {
                  this.props.navigation.navigate('LoginContainer');
                }}
              >
                <Text style={{ fontSize: 17 }}>스킵</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={this.submitPreference}
              >
                <Text style={{ fontSize: 17 }}>완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: 'white',
    paddingHorizontal: '6%',
    paddingTop: '12%',
    marginBottom: '2%',
    flex: 1,
  },
  section: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  preference: {
    marginTop: '4%',
  },
  preSection: {
    marginVertical: '3%',
    paddingLeft: 6,
    fontSize: 18,
  },
  attention: {
    marginLeft: '2%',
    marginRight: '2%',
    paddingBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  add: {
    backgroundColor: 'white',
    fontSize: 17,
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
  citySelected: {
    marginLeft: '2%',
    alignSelf: 'flex-start',
    fontSize: 17,
    color: 'white',
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: '#62CCAD',
    borderRadius: 20,
    marginBottom: 10,
  },
  selected: {
    fontSize: 17,
    color: 'white',
    marginTop: 9,
    marginRight: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: '#62CCAD',
    borderRadius: 20,
  },
  notSelected: {
    fontSize: 17,
    color: 'white',
    marginTop: 9,
    marginRight: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: '#D1D1D1',
    borderRadius: 20,
  },
  favor: {
    flexDirection: 'row',
    paddingBottom: 10,
    marginLeft: '2%',
    marginRight: '2%',
  },
  submitBtn: {
    backgroundColor: 'white',
    borderWidth: 1,
    fontSize: 18,
    marginTop: '10%',
    marginBottom: 5,
    marginHorizontal: 5,
    padding: 3,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
};

export default UserPreference;
