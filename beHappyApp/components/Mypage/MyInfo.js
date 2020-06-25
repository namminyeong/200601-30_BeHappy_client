import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { Specialties, States, KindOfCenters } from '../../Data/Preference';
import CompleteModal from '../../Modal/CompleteModal';
import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();

class MyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCity: '',
      currentStates: '',
      currentSpecialties: [],
      currentKindOfCenters: [],
      isModify: false,
      showCompleteModal: false,
      showModalText: '',
      userSpecialties: [],
      userKindOfCenters: [],
    };
    this.getUserPreference = this.getUserPreference.bind(this);
    this.getUserSpecialties = this.getUserSpecialties.bind(this);
    this.getUserKindOfCenters = this.getUserKindOfCenters.bind(this);
    this.changeSpecialties = this.changeSpecialties.bind(this);
  }

  componentDidMount() {
    this.getUserPreference(this.props.route.params.token);
  }

  getUserPreference(token) {
    let url = ec2 + '/preference';

    fetch(url, {
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

  modifyPreference(
    currentSpecialties,
    currentKindOfCenters,
    currentCity,
    currentStates
  ) {
    let url = ec2 + '/preference';

    fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.route.params.token}`,
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

  showAlertModal() {
    this.setState({
      showCompleteModal: true,
      showModalText: '시/구/군을 확인해주세요',
    });
    {
      setTimeout(() => {
        this.setState({ showCompleteModal: false, showModalText: '' });
      }, 1500);
    }
  }

  render() {
    const { username, phone } = this.props.route.params;
    const {
      currentCity,
      currentStates,
      currentSpecialties,
      currentKindOfCenters,
      userSpecialties,
      showModalText,
      userKindOfCenters,
      showCompleteModal,
    } = this.state;

    return this.state.isModify ? (
      <View style={styles.container}>
        <View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={styles.section}>상세 관심사</Text>
            <Entypo
              name='check'
              size={24}
              style={{ top: 2, right: 20 }}
              onPress={() => {
                currentCity !== '' &&
                !States[currentCity].includes(currentStates)
                  ? this.showAlertModal()
                  : this.setState({
                      isModify: false,
                      currentSpecialties: userSpecialties
                        .map((data) => (data[1] ? data[0] : null))
                        .filter((el) => el !== null),
                      currentKindOfCenters: userKindOfCenters
                        .map((data) => (data[1] ? data[0] : null))
                        .filter((el) => el !== null),
                    });
                this.modifyPreference(
                  userSpecialties
                    .map((data) => (data[1] ? data[0] : null))
                    .filter((el) => el !== null),
                  userKindOfCenters
                    .map((data) => (data[1] ? data[0] : null))
                    .filter((el) => el !== null),
                  currentCity,
                  currentStates
                );
              }}
            />
            <Modal
              animationType='none'
              transparent={true}
              visible={showCompleteModal}
            >
              <CompleteModal showModalText={showModalText} />
            </Modal>
          </View>
          <View
            style={{ marginTop: 14, height: 1, backgroundColor: '#B2BEC3' }}
          />
          <Text
            style={{
              paddingTop: 14,
              paddingBottom: 14,
              color: '#636E72',
              alignContent: 'center',
            }}
          >
            * 아래의 내용을 바탕으로 상담소를 사용자의 관심사에 따라 추천하는
            순서대로 빨간색-주황색-노란색으로 표시합니다.
          </Text>
          <Text style={styles.preSection}>분야</Text>
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
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <RNPickerSelect
              style={{
                inputAndroid: {
                  color: 'black',
                  fontSize: 17,
                  marginLeft: '6%',
                  paddingRight: 50,
                  textAlign: 'center',
                },
              }}
              useNativeAndroidPickerStyle={false}
              placeholder={{ label: currentCity, value: currentCity }}
              onValueChange={(value) => this.setState({ currentCity: value })}
              items={Object.keys(States)
                .sort()
                .map((ele) => {
                  return { label: `${ele}`, value: `${ele}` };
                })}
            />
            {currentCity === '' ? null : (
              <RNPickerSelect
                style={{
                  inputAndroid: {
                    color: 'black',
                    fontSize: 17,
                    marginLeft: '10%',
                    paddingRight: 50,
                    textAlign: 'center',
                  },
                }}
                useNativeAndroidPickerStyle={false}
                placeholder={{ label: currentStates, value: currentStates }}
                onValueChange={(value) =>
                  this.setState({
                    currentStates: value,
                  })
                }
                items={States[currentCity].sort().map((ele) => {
                  return { label: `${ele}`, value: `${ele}` };
                })}
              />
            )}
          </View>

          <Text style={styles.preSection}>센터</Text>
          <View style={styles.favor}>
            {userKindOfCenters.map((data, index) => (
              <TouchableOpacity
                key={index}
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
              <Text style={styles.section}>
                이<Text style={{ fontSize: 13 }}>{'     '}</Text>름 :
              </Text>
              <Text style={styles.info}>{username}</Text>
            </View>
            <View style={styles.phoneStyle}>
              <Text style={styles.section}>연락처 :</Text>
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
            style={{
              marginTop: '4%',
              height: 1,
              backgroundColor: '#B2BEC3',
            }}
          />
          <View style={{ marginTop: '6%' }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={styles.section}>상세 관심사</Text>
              <SimpleLineIcons
                name='pencil'
                size={20}
                style={{ top: 2, right: 20 }}
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
              />
            </View>
            <Text style={styles.preSection}>분야</Text>
            <View style={styles.attention}>
              {currentSpecialties.length === 0 ? (
                <Text style={{ margin: 6 }}>선택한 분야가 없습니다</Text>
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
              {currentCity === '' || currentCity === '*선택해제' ? (
                <Text style={{ margin: 6 }}>선택한 지역이 없습니다</Text>
              ) : (
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.selected}>{currentCity}</Text>
                  <Text style={styles.selected}>{currentStates}</Text>
                </View>
              )}
            </View>

            <Text style={styles.preSection}>센터</Text>
            <View style={styles.favor}>
              {currentKindOfCenters.length === 0 ? (
                <Text style={{ margin: 6 }}>선택한 센터가 없습니다</Text>
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
    padding: '6%',
    backgroundColor: '#FFFFFF',
  },
  section: {
    fontSize: 20,
    paddingRight: 20,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 18,
  },
  nameStyle: {
    paddingBottom: 4,
    flexDirection: 'row',
  },
  phoneStyle: {
    height: 40,
    flexDirection: 'row',
  },
  preSection: {
    marginTop: '4%',
    paddingLeft: 6,
    fontSize: 17,
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
    borderRadius: 20,
    paddingHorizontal: 17,
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 15,
    marginBottom: 20,
    width: 70,
    height: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    fontSize: 17,
    marginTop: 9,
    marginRight: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: '#62CCAD',
    borderRadius: 20,
    color: '#FFFFFF',
  },
  notSelected: {
    fontSize: 17,
    marginTop: 9,
    marginRight: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: '#D1D1D1',
    borderRadius: 20,
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
  modalText: {
    fontSize: 17,
    textAlign: 'center',
  },
});

export default MyInfo;
