import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

let radio_props = [
  { label: '일반 사용자', value: 0 },
  { label: 'center 사용자', value: 1 },
];

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      phone: '',
      centerName: '',
      businessNumber: '',
      latitude: 0,
      longitude: 0,
      value: 0,
    };

    this.userSignup = this.userSignup.bind(this);
    this.centerSignup = this.centerSignup.bind(this);
  }

  userSignup() {
    const { username, password, phone } = this.state;
    console.log('username: ', username);
    console.log('password: ', password);
    fetch('http://13.209.16.103:4000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }), // phone 추가할 것
      redirect: 'follow',
    })
      .then((res) => {
        console.log(res);
        return res.text();
      })
      .then((res) => {
        console.log(res);
        if (res.errorCode === 3) {
          alert('이미 존재하는 username입니다.');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      });
  }

  centerSignup() {
    const {
      username,
      password,
      centerName,
      businessNumber,
      latitude,
      longitude,
    } = this.state;

    fetch('http://13.209.16.103:4000/user/signup/center', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        centerName,
        businessNumber,
        latitude,
        longitude,
      }),
    })
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      username,
      password,
      phone,
      centerName,
      businessNumber,
      latitude,
      longitude,
      value,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.radioForm}>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            formHorizontal={true}
            buttonSize={12}
            onPress={(value) => {
              this.setState({ value: value });
            }}
          />
        </View>
        {value === 0 ? (
          <View style={styles.inputForm}>
            <Text>일반 사용자</Text>
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid='rgba(255, 255, 255, 0)'
              placeholder='username'
              placeholderTextColor='#ffffff'
              onChangeText={(username) => this.setState({ username })}
            />
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid='rgba(255, 255, 255, 0)'
              placeholder='password'
              placeholderTextColor='#ffffff'
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
            />
            {/* <TextInput
              style={styles.inputBox}
              underlineColorAndroid='rgba(255, 255, 255, 0)'
              placeholder='phone'
              placeholderTextColor='#ffffff'
              onChangeText={(phone) => this.setState({ phone })}
            /> */}
            <TouchableOpacity onPress={this.userSignup}>
              <Text>회원 가입</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.inputForm}>
            <Text>center 사용자</Text>
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid='rgba(255, 255, 255, 0)'
              placeholder='username'
              placeholderTextColor='#ffffff'
              onChangeText={(username) => this.setState({ username })}
            />
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid='rgba(255, 255, 255, 0)'
              placeholder='password'
              placeholderTextColor='#ffffff'
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
            />
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid='rgba(255, 255, 255, 0)'
              placeholder='센터명'
              placeholderTextColor='#ffffff'
              onChangeText={(centerName) => this.setState({ centerName })}
            />
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid='rgba(255, 255, 255, 0)'
              placeholder='사업자 번호'
              placeholderTextColor='#ffffff'
              onChangeText={(businessNumber) =>
                this.setState({ businessNumber })
              }
            />
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid='rgba(255, 255, 255, 0)'
              placeholder='위도'
              placeholderTextColor='#ffffff'
              onChangeText={(latitude) => this.setState({ latitude })}
            />
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid='rgba(255, 255, 255, 0)'
              placeholder='경도'
              placeholderTextColor='#ffffff'
              onChangeText={(longitude) => this.setState({ longitude })}
            />
            <TouchableOpacity onPress={this.centerSignup}>
              <Text>회원 가입</Text>
            </TouchableOpacity>
          </View>
        )}
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
  radioForm: {
    flex: 1,
    justifyContent: 'center',
  },
  inputForm: {
    flex: 1,
    justifyContent: 'center',
  },
  inputBox: {
    flex: 1,
    justifyContent: 'center',
    width: 300,
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },
});
