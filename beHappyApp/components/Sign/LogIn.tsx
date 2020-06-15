import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import deviceStorage from '../../service/DeviceStorage';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.loginUser = this.loginUser.bind(this);
  }

  loginUser() {
    console.log('login');
    const { username, password } = this.state;

    fetch('http://13.209.16.103:4000/user/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 403) {
          return response.json();
        }
        return '';
      })
      .then((payload) => {
        if (typeof payload === 'object') {
          if (!payload.errorCode) {
            alert('로그인이 완료됐습니다.');
            if (payload.adminState === 0 || payload.adminState === -1) {
              this.props.controlLogin(0, payload.token);
            } else if (payload.adminState === 1) {
              this.props.controlLogin(1, payload.token);
            }
            deviceStorage.saveKey('id_token', payload.token);
          } else if (payload.errorCode === 1) {
            alert('아이디를 확인해주세요.');
          } else if (payload.errorCode === 2) {
            alert('비밀번호를 확인해주세요.');
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { username, password } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            style={{ width: 150, height: 60 }}
            source={require('../../assets/behappy.png')}
          />
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid='rgba(0, 0, 0, 0)'
            placeholder='username'
            placeholderTextColor='#ffffff'
            value={username}
            onChangeText={(username) => this.setState({ username })}
          />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid='rgba(0, 0, 0, 0)'
            placeholder='password'
            secureTextEntry={true}
            placeholderTextColor='#ffffff'
            value={password}
            onChangeText={(password) => this.setState({ password })}
          />
          <TouchableOpacity style={styles.btn} onPress={this.loginUser}>
            <Text style={styles.btnText}>로그인</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signEntry}>
          <Text style={styles.signUpText}>아직 회원이 아니신가요?</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signup')}
          >
            <Text style={styles.signUpBtn}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  form: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    width: 300,
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },
  btn: {
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  signEntry: {
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
};

export default Login;