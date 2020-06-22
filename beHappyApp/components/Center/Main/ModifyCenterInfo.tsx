import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import getEnvVars from '../../../environment';
const { ec2 } = getEnvVars();
import { Specialties } from '../../../Data/Preference';
import { Button } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

export default class ModifyCenterInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      centerSpeicialties: {},
      specialties: Specialties,
    };
    this.completedModify = this.completedModify.bind(this);
    this.changeSpecialties = this.changeSpecialties.bind(this);
  }

  completedModify() {
    const body = Object.keys(this.state.centerSpeicialties);
    fetch(ec2 + '/preference/center', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.route.params.token}`,
      },
      body: JSON.stringify({ specialties: body }),
    }).then((res) => {
      if (res.status === 200) {
        this.props.route.params.changeSpecialties(
          this.state.centerSpeicialties
        );
        this.props.navigation.navigate('CenterInfo');
      }
    });
  }

  changeSpecialties(specialty) {
    let newState = Object.assign({}, this.state.centerSpeicialties);
    if (newState[specialty]) {
      delete newState[specialty];
    } else {
      newState[specialty] = true;
    }
    this.setState({
      centerSpeicialties: newState,
    });
  }

  componentDidMount() {
    this.setState({
      centerSpeicialties: this.props.route.params.centerSpeicialties,
    });
  }

  render() {
    const { centerSpeicialties, specialties } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>전문분야를 선택해주세요</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {specialties.map((speicialtyArr, index) => (
            <TouchableOpacity
              key={'Specialties_' + index}
              onPress={() => {
                this.changeSpecialties(speicialtyArr[0]);
              }}
            >
              <Text
                style={
                  centerSpeicialties[speicialtyArr[0]]
                    ? styles.selected
                    : styles.notSelected
                }
              >
                #{speicialtyArr[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            small
            transparent
            style={styles.completeButton}
            onPress={this.completedModify}
          >
            <Entypo name='check' size={23} />
            <Text style={styles.completeText}>완료</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 33,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    marginBottom: 20,
  },
  specialtyBox: {
    flexDirection: 'row',
  },
  selected: {
    fontSize: 17,
    backgroundColor: '#62CCAD',
    paddingHorizontal: 10,
    borderRadius: 20,
    paddingVertical: 3,
    color: 'white',
    marginHorizontal: 7,
    marginVertical: 10,
  },
  notSelected: {
    fontSize: 17,
    backgroundColor: '#D1D1D1',
    paddingHorizontal: 10,
    borderRadius: 20,
    paddingVertical: 3,
    color: 'white',
    marginHorizontal: 7,
    marginVertical: 10,
  },
  completeButton: {
    borderRadius: 20,
    paddingHorizontal: 17,
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 30,
    width: 90,
    height: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: 'white',
  },
  completeText: {
    fontSize: 18,
  },
});
