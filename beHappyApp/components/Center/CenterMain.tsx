import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import deviceStorage from '../../service/DeviceStorage';
import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();
import ReviewGraph from './ReviewGraph';

export default function CenterMain({ controlLogin, token, CenterInfo }) {
  const logoutCenter = () => {
    fetch(ec2 + '/user/logout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.centerName}>{CenterInfo.centerName}</Text>

      <ReviewGraph />
      <TouchableOpacity onPress={logoutCenter}>
        <Text style={styles.logoutText}>logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    flex: 1,
  },
  centerName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  logoutText: {
    marginTop: 20,
    color: '#62CCAD',
    paddingRight: '10%',
    fontWeight: 'bold',
  },
});
