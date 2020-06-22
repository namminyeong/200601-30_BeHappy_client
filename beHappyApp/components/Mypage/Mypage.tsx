import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Linking from 'expo-linking';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DeviceStorage from '../../service/DeviceStorage';
import LogoutContainer from '../../containers/LogoutContainer';
import { runInThisContext } from 'vm';

class Mypage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      phone: '',
    };
    this.getUserBasicInfo = this.getUserBasicInfo.bind(this);
  }

  componentDidMount() {
    DeviceStorage.loadJWT().then((value) => {
      this.getUserBasicInfo(value);
    });
  }

  getUserBasicInfo(token) {
    const { username, phone } = this.state;

    fetch('http://13.209.16.103:4000/user', {
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
      .then((payload) => {
        this.setState({
          username: payload.nickname,
          phone: payload.phone,
        });
        return;
      });
  }

  pressAds() {
    Linking.openURL('https://www.simcong.com/quiz/2');
  }

  render() {
    const { username, phone } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.main}>마이페이지</Text>
        <View style={styles.title}>
          <Text style={styles.mypageText}>오늘도 좋은 하루 되세요</Text>
          <MaterialCommunityIcons
            name='weather-sunny'
            color='brown'
            size={23}
          />
        </View>

        <View>
          <TouchableOpacity
            style={styles.userInfo}
            onPress={() => {
              this.props.navigation.navigate('MyInfo', {
                username: username,
                phone: phone,
              });
            }}
          >
            <Text style={styles.user}>{username}</Text>

            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, marginLeft: 5 }}>님</Text>
              {<Entypo name='chevron-right' size={23} color={'black'} />}
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignSelf: 'center',
            width: '98%',
            marginVertical: '1%',
            height: 1,
            backgroundColor: '#e6e6e6',
          }}
        />

        <View style={styles.list}>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
              this.props.navigation.navigate('BookMarkContainer');
            }}
          >
            <MaterialCommunityIcons
              name='bookmark-multiple-outline'
              color='black'
              size={25}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.itemText}>즐겨찾기</Text>
          </TouchableOpacity>
          <View style={styles.lightBorder} />

          <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
              this.props.navigation.navigate('MyReviewsContainer');
            }}
          >
            <MaterialCommunityIcons
              name='comment-text-multiple-outline'
              color='black'
              size={25}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.itemText}>리뷰관리</Text>
          </TouchableOpacity>
          <View style={styles.lightBorder} />
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
              this.props.navigation.navigate('MyBookingContainer');
            }}
          >
            <MaterialCommunityIcons
              name='calendar'
              color='black'
              size={25}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.itemText}>예약관리</Text>
          </TouchableOpacity>
          <View style={styles.lightBorder} />

          <LogoutContainer />
        </View>

        <TouchableOpacity
          onPress={this.pressAds.bind(this)}
          style={{
            backgroundColor: 'white',
            alignSelf: 'center',
            position: 'absolute',
            bottom: 10,
            width: '95%',
            borderColor: 'lightgrey',
            borderWidth: 0.5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.9,
            shadowRadius: 4.14,
            elevation: 7,
          }}
        >
          <Image
            source={require('../../assets/ad.png')}
            style={{
              width: '60%',
              height: 120,
              bottom: -20,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              width: '100%',
              bottom: 110,
            }}
          >
            스트레스가 많으신가요? 스트레스 자가진단 테스트를 해보세요!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  main: {
    marginTop: 60,
    paddingLeft: '10%',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#62CCAD',
  },
  title: {
    marginTop: 30,
    paddingLeft: '10%',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mypageText: {
    color: 'black',
    fontSize: 17,
  },
  userInfo: {
    marginBottom: 10,
    paddingLeft: '8%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    paddingLeft: 10,
    fontSize: 20,
  },
  lightBorder: {
    alignSelf: 'center',
    width: '98%',
    height: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 10,
  },
  listItem: {
    borderColor: 'grey',
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '100%',
    padding: '6%',
  },
  itemText: {
    fontSize: 18,
    color: 'black',
  },
});

export default Mypage;
