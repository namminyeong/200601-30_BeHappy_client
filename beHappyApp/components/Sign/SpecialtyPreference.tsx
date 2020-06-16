import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

class SpecialtyPreference extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      centerId: this.props.route.params.centerId,
      specialties: [],
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
    this.inputSpecialty = this.inputSpecialty.bind(this);
    this.deleteSpecialty = this.deleteSpecialty.bind(this);
  }

  submitPreference() {
    const { centerId, specialties } = this.state;

    fetch('http://13.209.16.103:4000/preference/center', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ centerId, specialties }),
    })
      .then((response) => {
        if (response.status === 200) {
          alert('제출에 성공했습니다.');
          this.props.navigation.navigate('LoginContainer');
        }
      })
      .catch((error) => {
        alert('제출에 실패했습니다.');
      });
  }

  inputSpecialty(value) {
    this.setState({
      specialties: [...this.state.specialties, value],
    });
  }

  deleteSpecialty(value) {
    const { specialties } = this.state;

    this.setState({
      specialties: specialties.filter((specialty) => specialty !== value),
    });
  }

  render() {
    const { specialties, specialtyDatas } = this.state;

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
            <Text style={styles.preSection}>전문 분야</Text>
            <View style={styles.attention}>
              {specialtyDatas.map((data, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.hashtagButton}
                  onPress={() => this.inputSpecialty(data)}
                >
                  <Text style={{ color: 'white' }}>#{data}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.preSection}>내가 선택한 전문 분야</Text>
            <View style={styles.attention}>
              {specialties.map((data, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.selectedHashtagButton}
                  onPress={() => this.deleteSpecialty(data)}
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
    color: '#62CCAD',
    fontSize: 20,
    paddingRight: 20,
    fontWeight: 'bold',
  },
  preference: {
    marginTop: '4%',
  },
  preSection: {
    marginTop: '2%',
    paddingLeft: 6,
    color: '#62CCAD',
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

export default SpecialtyPreference;
