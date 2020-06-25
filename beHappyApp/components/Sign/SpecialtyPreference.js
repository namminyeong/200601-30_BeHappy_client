import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();

import { SpecialtiesArray } from '../../Data/Preference';

class SpecialtyPreference extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      centerId: this.props.route.params.centerId,
      specialties: [],
      showAlertModal: false,
      showAlertModalText: '',
    };

    this.submitPreference = this.submitPreference.bind(this);
    this.handleSpecialty = this.handleSpecialty.bind(this);
  }

  submitPreference() {
    fetch(ec2 + '/preference/center', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        centerId: this.state.centerId,
        specialties: this.state.specialties,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          this.props.navigation.navigate('LoginContainer');
        }
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }

  handleSpecialty(value) {
    const newState = Object.assign(this.state.specialties);
    let index = newState.indexOf(value);
    if (index === -1) {
      newState.push(value);
      this.setState({
        specialties: newState,
      });
    } else {
      newState.splice(index, 1);
      this.setState({
        specialties: newState,
      });
    }
  }

  render() {
    const { specialties } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.preference}>
          <Text style={styles.section}>상세 관심사</Text>
          <Text style={{ marginTop: '2%' }}>
            * 아래의 내용을 바탕으로 상담소를 사용자의 관심사에 따라 추천하는
            순서대로 빨간색-주황색-노란색으로 표시합니다.
          </Text>
          <Text style={styles.preSection}>전문 분야</Text>
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

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('LoginContainer');
              }}
            >
              <Text style={styles.submitBtn}>스킵</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.submitPreference}>
              <Text style={styles.submitBtn}>완료</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: '6%',
    paddingVertical: '12%',
  },
  section: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
    paddingBottom: 10,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
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
  submitBtn: {
    backgroundColor: 'white',
    borderWidth: 1,
    fontSize: 18,
    marginTop: '40%',
    marginRight: 10,
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

export default SpecialtyPreference;
