import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import DeviceStorage from '../../service/DeviceStorage';
import { Specialties, States, KindOfCenters } from '../../Data/Preference';

class MyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCity: '',
      currentStates: '',
      currentSpecialties: [],
      currentKindOfCenters: [],
      isModify: false,
      userSpecialties: [],
      userKindOfCenters: [],
    };
    this.getUserPreference = this.getUserPreference.bind(this);
    this.getUserSpecialties = this.getUserSpecialties.bind(this);
    this.getUserKindOfCenters = this.getUserKindOfCenters.bind(this);
    this.changeSpecialties = this.changeSpecialties.bind(this);
  }

  componentDidMount() {
    DeviceStorage.loadJWT().then((value) => {
      this.getUserPreference(value);
    });
  }

  getUserPreference(token) {
    fetch('http://13.209.16.103:4000/preference', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return '';
      })
      .then((payload) => {
        this.setState({
          currentCity: payload.city.name.split(' ')[0],
          currentStates: payload.city.name.split(' ')[1],
          currentSpecialties: payload.specialties.map((data) => data.name),
          currentKindOfCenters: payload.kindOfCenters.map((data) => data.name),
        });
        return;
      });
  }

  modifyPreference(token) {
    const {
      currentSpecialties,
      currentKindOfCenters,
      currentCity,
      currentStates,
    } = this.state;

    fetch('http://13.209.16.103:4000/preference', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        specialties: currentSpecialties,
        kindOfCenters: currentKindOfCenters,
        city: currentCity + ' ' + currentStates,
      }),
    }).then((res) => {
      return res.status;
    });
  }

  getUserSpecialties(currentSpecialties) {
    for (let i = 0; i < Specialties.length; i++) {
      Specialties.map((data) =>
        data.includes(currentSpecialties[i]) ? (data[1] = true) : data
      );
    }
    return Specialties;
  }

  getUserKindOfCenters(currentKindOfCenters) {
    for (let i = 0; i < KindOfCenters.length; i++) {
      KindOfCenters.map((data) =>
        data.includes(currentKindOfCenters[i]) ? (data[1] = true) : data
      );
    }
    return KindOfCenters;
  }

  changeSpecialties(index) {
    let newState = Specialties;
    let present = newState[index][1];
    newState[index][1] = !present;
    this.setState({
      userSpecialties: newState,
    });
  }

  changeKindOfCenters(index) {
    let newState = KindOfCenters;
    let present = newState[index][1];
    newState[index][1] = !present;
    this.setState({
      userKindOfCenters: newState,
    });
  }

  render() {
    const { username, phone } = this.props.route.params;
    const {
      currentCity,
      currentStates,
      currentSpecialties,
      currentKindOfCenters,
      userSpecialties,
      userKindOfCenters,
    } = this.state;

    return this.state.isModify ? (
      <View style={styles.container}>
        <Text
          style={{
            paddingTop: 28,
            paddingBottom: 28,
            color: '#636E72',
            alignContent: 'center',
          }}
        >
          * 아래 내용을 참고하여 지도에 마커가 표시됩니다.
        </Text>
        <View
          style={{ marginTop: '4%', height: 2, backgroundColor: '#B2BEC3' }}
        />
        <View style={styles.preference}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.section}>Preference</Text>
            <TouchableOpacity
              style={{ marginRight: '2%' }}
              onPress={() => {
                currentCity !== '' &&
                !States[currentCity].includes(currentStates)
                  ? alert('시/구/군을 다시 선택해주세요.')
                  : this.setState({
                      isModify: false,
                      currentSpecialties: userSpecialties
                        .map((data) => (data[1] ? data[0] : null))
                        .filter((el) => el !== null),
                      currentKindOfCenters: userKindOfCenters
                        .map((data) => (data[1] ? data[0] : null))
                        .filter((el) => el !== null),
                    });
                DeviceStorage.loadJWT().then((value) => {
                  this.modifyPreference(
                    currentSpecialties,
                    currentKindOfCenters,
                    currentCity,
                    currentStates
                  );
                });
              }}
            >
              <Text style={styles.modifyButton}>완료</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.preSection}>관심분야</Text>
          <View style={styles.attention}>
            {userSpecialties.map((data, index) => (
              <TouchableOpacity
                key={'Specialties_' + index}
                onPress={() => {
                  this.changeSpecialties(index);
                }}
              >
                <Text style={data[1] ? styles.selected : styles.notSelected}>
                  #{data}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.preSection}>지역</Text>
          <View>
            <RNPickerSelect
              placeholder={{ label: '지역 선택', value: currentCity }}
              onValueChange={(value) => this.setState({ currentCity: value })}
              items={Object.keys(States).map((ele) => {
                return { label: `${ele}`, value: `${ele}` };
              })}
            />
            {currentCity === '' ? null : (
              <RNPickerSelect
                placeholder={{ label: '시/구/군 선택', value: currentStates }}
                onValueChange={(value) =>
                  this.setState({
                    currentStates: value,
                  })
                }
                items={States[currentCity].map((ele) => {
                  return { label: `${ele}`, value: `${ele}` };
                })}
              />
            )}
          </View>

          <Text style={styles.preSection}>선호센터</Text>
          <View style={styles.favor}>
            {userKindOfCenters.map((data, index) => (
              <TouchableOpacity
                onPress={() => {
                  this.changeKindOfCenters(index);
                }}
              >
                <Text
                  key={'KindOfCenters_' + index}
                  style={data[1] ? styles.selected : styles.notSelected}
                >
                  {data}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View>
            <View style={styles.nameStyle}>
              <Text style={styles.section}>이름</Text>
              <Text style={styles.info}>{username}</Text>
            </View>
            <View style={styles.phoneStyle}>
              <Text style={styles.section}>연락처</Text>
              <Text style={styles.info}>
                {phone.slice(0, 3) +
                  '-' +
                  phone.slice(3, 7) +
                  '-' +
                  phone.slice(7)}
              </Text>
            </View>
          </View>

          <View
            style={{ marginTop: '4%', height: 2, backgroundColor: '#B2BEC3' }}
          />
          <View style={styles.preference}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.section}>Preference</Text>
              <TouchableOpacity
                style={{ marginRight: '2%' }}
                onPress={() => {
                  this.setState({
                    isModify: true,
                    userSpecialties:
                      Specialties.length === 0
                        ? []
                        : this.getUserSpecialties(currentSpecialties),
                    userKindOfCenters:
                      KindOfCenters.length === 0
                        ? []
                        : this.getUserKindOfCenters(currentKindOfCenters),
                  });
                }}
              >
                <Text style={styles.modifyButton}>수정</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.preSection}>관심분야</Text>
            <View style={styles.attention}>
              {currentSpecialties.length === 0 ? (
                <Text style={{ margin: 6 }}>선택한 관심분야가 없습니다.</Text>
              ) : (
                currentSpecialties.map((data, index) => (
                  <Text key={'Specialties_' + index} style={styles.selected}>
                    #{data}
                  </Text>
                ))
              )}
            </View>

            <Text style={styles.preSection}>지역</Text>
            <View style={styles.area}>
              {currentCity === '' || currentCity === '선택해제' ? (
                <Text style={{ margin: 6 }}>선택한 지역이 없습니다</Text>
              ) : (
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.selected}>{currentCity}</Text>
                  <Text style={styles.selected}>{currentStates}</Text>
                </View>
              )}
            </View>

            <Text style={styles.preSection}>선호센터</Text>
            <View style={styles.favor}>
              {currentKindOfCenters.length === 0 ? (
                <Text style={{ margin: 6 }}>선택한 선호센터가 없습니다.</Text>
              ) : (
                currentKindOfCenters.map((data, index) => (
                  <Text key={'KindOfCenters_' + index} style={styles.selected}>
                    {data}
                  </Text>
                ))
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '4%',
  },
  section: {
    color: '#62CCAD',
    fontSize: 20,
    paddingRight: 20,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 18,
  },
  nameStyle: {
    marginTop: '2%',
    flexDirection: 'row',
  },
  phoneStyle: {
    height: 40,
    flexDirection: 'row',
  },
  preference: {
    marginTop: '4%',
  },
  preSection: {
    marginTop: '2%',
    paddingLeft: 6,
    fontSize: 16,
    fontWeight: 'bold',
  },
  attention: {
    marginLeft: '2%',
    marginRight: '2%',
    paddingBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  area: {
    marginLeft: '2%',
    marginRight: '2%',
    paddingBottom: 10,
  },
  favor: {
    marginLeft: '2%',
    marginRight: '2%',
    paddingBottom: 10,
    flexDirection: 'row',
  },
  modifyButton: {
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#62CCAD',
    borderRadius: 10,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selected: {
    marginTop: 9,
    marginRight: 10,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#62CCAD',
    borderRadius: 10,
    color: '#FFFFFF',
  },
  notSelected: {
    marginTop: 9,
    marginRight: 10,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#D1D1D1',
    borderRadius: 10,
    color: '#FFFFFF',
  },

  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    color: '#000000',
    fontSize: 50,
    marginBottom: 30,
  },
});

export default MyInfo;
