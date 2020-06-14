import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

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
      favorCenterDatas: ['정신과', '심리센터'],
      specialtyDatas: [
        '스트레스',
        '가족',
        '식이',
        '부부',
        '우울증',
        '불면증',
        '학교폭력',
        '아동',
        '불안',
        '강박',
      ],
    };

    this.submitPreference = this.submitPreference.bind(this);
    this.selectCity = this.selectCity.bind(this);
    this.inputCity = this.inputCity.bind(this);
    this.selectState = this.selectState.bind(this);
    this.inputState = this.inputState.bind(this);
    this.resetState = this.resetState.bind(this);
    this.inputSpecialty = this.inputSpecialty.bind(this);
    this.deleteSpecialty = this.deleteSpecialty.bind(this);
    this.inputSpecialtyDatas = this.inputSpecialtyDatas.bind(this);
    this.deleteSpecialtyDatas = this.deleteSpecialtyDatas.bind(this);
    this.inputFavorCity = this.inputFavorCity.bind(this);
    this.inputFavorCenter = this.inputFavorCenter.bind(this);
    this.deleteFavorCenter = this.deleteFavorCenter.bind(this);
    this.inputFavorCenterDatas = this.inputFavorCenterDatas.bind(this);
    this.deleteSpecialtyDatas = this.deleteSpecialtyDatas.bind(this);
  }

  submitPreference() {
    const { userId, specialties, favorCenter, favorCity } = this.state;
    let kindOfCenters = favorCenter;
    let city = favorCity;

    fetch('http://13.209.16.103:4000/preference', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, specialties, kindOfCenters, city }),
    })
      .then((res) => {
        if (res.status === 200) {
          alert('제출에 성공했습니다.');
          this.props.navigation.navigate('LoginContainer');
        }
      })
      .catch((error) => {
        alert('제출에 실패했습니다.');
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

  inputSpecialty(value) {
    this.setState({
      specialties: [...this.state.specialties, value],
    });
    this.deleteSpecialtyDatas(value);
  }

  deleteSpecialty(value) {
    const { specialties } = this.state;

    this.setState({
      specialties: specialties.filter((specialty) => specialty !== value),
    });
    this.inputSpecialtyDatas(value);
  }

  inputSpecialtyDatas(value) {
    const { specialtyDatas } = this.state;

    this.setState({
      specialtyDatas: [...this.state.specialtyDatas, value],
    });
  }

  deleteSpecialtyDatas(value) {
    const { specialtyDatas } = this.state;

    this.setState({
      specialtyDatas: specialtyDatas.filter((specialty) => specialty !== value),
    });
  }

  inputFavorCity() {
    this.setState({
      favorCity: this.state.city + ' ' + this.state.state,
    });
  }

  inputFavorCenter(value) {
    this.setState({
      favorCenter: [...this.state.favorCenter, value],
    });
    this.deleteFavorCenterDatas(value);
  }

  deleteFavorCenter(value) {
    const { favorCenter } = this.state;

    this.setState({
      favorCenter: favorCenter.filter((center) => center !== value),
    });
    this.inputFavorCenterDatas(value);
  }

  inputFavorCenterDatas(value) {
    const { favorCenterDatas } = this.state;

    this.setState({
      favorCenterDatas: [...favorCenterDatas, value],
    });
  }

  deleteFavorCenterDatas(value) {
    const { favorCenterDatas } = this.state;

    this.setState({
      favorCenterDatas: favorCenterDatas.filter((center) => center !== value),
    });
  }

  render() {
    const {
      city,
      state,
      specialtyDatas,
      favorCity,
      favorCenter,
      favorCenterDatas,
      specialties,
    } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              borderBottomWidth: 2,
              borderColor: '#62CCAD',
            }}
          />
          <View style={styles.preference}>
            <Text style={styles.section}>Preference</Text>
            <Text style={styles.preSection}>관심 분야</Text>
            <View style={styles.attention}>
              {specialtyDatas.map((data) => (
                <TouchableOpacity
                  style={styles.hashtagButton}
                  onPress={() => this.inputSpecialty(data)}
                >
                  <Text style={{ color: 'white' }}>#{data}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.preSection}>내가 선택한 전문 분야</Text>
            <View style={styles.attention}>
              {specialties.map((data) => (
                <TouchableOpacity
                  style={styles.selectedHashtagButton}
                  onPress={() => this.deleteSpecialty(data)}
                >
                  <Text style={{ color: 'white' }}>#{data}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.preSection}>관심 지역</Text>
            <View style={styles.area}>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={{
                  inputAndroid: {
                    fontSize: 14,
                    marginBottom: 10,
                    textAlign: 'center',
                  },
                }}
                placeholder={{ label: '지역을 선택해주세요', value: '' }}
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
                      fontSize: 14,
                      marginBottom: 10,
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
                  items={states[city].sort().map((ele) => {
                    return { label: `${ele}`, value: `${ele}` };
                  })}
                />
              ) : (
                <Text />
              )}
              <TouchableOpacity onPress={this.inputFavorCity}>
                <Text>추가</Text>
              </TouchableOpacity>
            </View>
            <Text>{favorCity}</Text>

            {/* {favorCity.map((city, index) => (
                <Text key={index}>
                  {city.city} {city.state}
                </Text>
              ))} */}

            <Text style={styles.preSection}>선호센터</Text>
            <View style={styles.favor}>
              {favorCenterDatas.map((center, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.favorButton}
                  onPress={() => {
                    this.inputFavorCenter(center);
                  }}
                >
                  <Text key={index} style={{ color: 'white' }}>
                    {center}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.preSection}>내가 선택한 선호 센터</Text>
            <View style={styles.attention}>
              {favorCenter.map((data) => (
                <TouchableOpacity
                  style={styles.selectedHashtagButton}
                  onPress={() => this.deleteFavorCenter(data)}
                >
                  <Text style={{ color: 'white' }}>#{data}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View
              style={{
                flex: 1,
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
                <Text
                  style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}
                >
                  스킵
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={this.submitPreference}
              >
                <Text
                  style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}
                >
                  완료
                </Text>
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
    flex: 1,
    margin: '4%',
  },
  section: {
    color: '#000000',
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
  mobileStyle: {
    height: 40,
    flexDirection: 'row',
  },
  preference: {
    marginTop: '4%',
  },
  preSection: {
    marginTop: '2%',
    paddingLeft: 6,
    color: '#000000',
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
  hashtagButton: {
    marginTop: 9,
    marginRight: 10,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#62CCAD',
    borderRadius: 10,
  },
  selectedHashtagButton: {
    marginTop: 9,
    marginRight: 10,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fcd36f',
    borderRadius: 10,
  },
  area: {
    marginLeft: '2%',
    marginRight: '2%',
    paddingBottom: 10,
    flexDirection: 'row',
  },
  areaButton: {
    marginTop: 9,
    marginRight: 10,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#62CCAD',
    borderRadius: 10,
  },
  favor: {
    flexDirection: 'row',
    paddingBottom: 10,
    marginLeft: '2%',
    marginRight: '2%',
  },
  favorButton: {
    marginTop: 9,
    marginRight: 10,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#62CCAD',
    borderRadius: 10,
  },
  submitBtn: {
    marginTop: '20%',
    marginRight: 10,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#62CCAD',
    borderRadius: 10,
  },
};

export default UserPreference;
