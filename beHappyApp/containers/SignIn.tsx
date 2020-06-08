import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Logo from '../components/SignIn/Logo';
import Form from '../components/SignIn/Form';
import SignUpEntry from '../components/SignIn/SignUpEntry';

export default class SignIn extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <Form />
        <SignUpEntry />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
