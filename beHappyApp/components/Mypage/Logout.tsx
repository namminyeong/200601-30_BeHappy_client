import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import deviceStorage from '../../service/DeviceStorage';

export default function Logout({ controlLogin, token }) {
  let logoutUser = () => {
    console.log(token);
    fetch('http://13.209.16.103:4000/user/logout', {
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
      <TouchableOpacity onPress={logoutUser}>
        <Text style={styles.logoutText}>logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    right: -130,
  },
  logoutText: {
    marginTop: 20,
    color: '#62CCAD',
    paddingRight: '10%',
    fontWeight: 'bold',
  },
});
