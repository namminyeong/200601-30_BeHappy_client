import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class SignUpEntry extends Component<{}> {
  signUp() {
    Actions.signup();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.signUpText}>Don't have an account yet?</Text>
        <TouchableOpacity onPress={this.signUp}>
          <Text style={styles.signUpBtn}>SignUp</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signUpText: {
    color: '#000000',
    fontSize: 16,
  },
  signUpBtn: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
});
