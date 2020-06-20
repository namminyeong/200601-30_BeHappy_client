import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import deviceStorage from '../../../service/DeviceStorage';
import getEnvVars from '../../../environment';
const { ec2 } = getEnvVars();

export default class CenterInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      centerSpeicialties: {},
    };
    this.logoutCenter = this.logoutCenter.bind(this);
    this.saveSpecialties = this.saveSpecialties.bind(this);
    this.changeSpecialties = this.changeSpecialties.bind(this);
  }

  componentDidMount() {
    const { token } = this.props.route.params;
    let url = ec2 + '/preference/center';
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
      .then((data) => {
        if (typeof data === 'object') {
          this.saveSpecialties(data.specialties);
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  saveSpecialties(centerSpeicialties) {
    let newState = {};
    centerSpeicialties.forEach((specialtyObj) => {
      newState[specialtyObj.name] = true;
    });
    this.setState({
      centerSpeicialties: newState,
    });
  }

  changeSpecialties(centerSpeicialties) {
    this.setState({
      centerSpeicialties,
    });
  }

  logoutCenter() {
    let { token, controlLogin } = this.props.route.params;
    fetch(ec2 + '/user/logout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((payload) => {
        if (payload.token === '') {
          controlLogin(-1, null);
          deviceStorage.deleteJWT();
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  render() {
    const { centerSpeicialties } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.centerName}>
          {this.props.route.params.centerName}
        </Text>
        <View style={styles.titleBox}>
          <Text style={styles.title}>전문분야</Text>
          <TouchableOpacity
            style={{ marginRight: '2%' }}
            onPress={() => {
              this.props.navigation.navigate('ModifyCenterInfo', {
                centerSpeicialties: centerSpeicialties,
                token: this.props.route.params.token,
                changeSpecialties: this.changeSpecialties,
              });
            }}
          >
            <Text style={styles.modifyText}>수정</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.specialtyBox}>
          {Object.keys(centerSpeicialties).length === 0 ? (
            <Text style={{ margin: 6 }}>선택한 관심분야가 없습니다.</Text>
          ) : (
            Object.keys(centerSpeicialties).map((specialty, index) => (
              <Text key={'Specialties_' + index} style={styles.selected}>
                #{specialty}
              </Text>
            ))
          )}
        </View>

        <TouchableOpacity onPress={this.logoutCenter} style={styles.logout}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 30,
  },
  centerName: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  titleBox: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  modifyText: {
    backgroundColor: 'white',
    marginRight: 20,
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft: 12,
    paddingRight: 10,
    paddingVertical: 2,
    borderRadius: 20,
    shadowColor: 'grey',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  specialtyBox: {
    flexWrap: 'wrap',
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
    marginVertical: 7,
  },
  logout: {
    borderRadius: 20,
    borderColor: 'darkgrey',
    borderWidth: 1,
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    shadowColor: 'lightgrey',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 3.23,
    shadowRadius: 2.62,
    elevation: 2,
    backgroundColor: 'white',
  },
  logoutText: {
    color: 'darkgrey',
    fontSize: 17,
  },
});
