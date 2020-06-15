import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LogoutContainer from '../../containers/LogoutContainer';
import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();

class Mypage extends React.Component {
  constructor(props) {
    super(props);
    console.log('Mypage 진입');
    console.log('Mypage props: ', this.props);

    this.state = {
      username: 'test',
    };

    this.getBookmark = this.getBookmark.bind(this);
    this.checkBookmark = this.checkBookmark.bind(this);
    this.postBookmark = this.postBookmark.bind(this);
    this.deleteBookmarkState = this.deleteBookmarkState.bind(this);
    this.postBookmarkState = this.postBookmarkState.bind(this);
  }

  getBookmark() {
    console.log('getBookmark 진입');
    fetch(ec2 + '/bookmark', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return '';
      })
      .then((data) => {
        console.log('getBookmark data: ', data);
        if (typeof data === 'object') {
          this.props.controlBookmark(data.centers);
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  checkBookmark(id) {
    let exist = false;
    let index;
    this.props.bookmark.forEach((ele, i) => {
      if (ele.id === id) {
        exist = true;
        index = i;
      }
    });
    return [exist, index];
  }

  postBookmark(method, centerId) {
    fetch(ec2 + '/bookmark', {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      },
      body: JSON.stringify({ centerId }),
    })
      .then((res) => {
        if (res.status === 200) {
          if (method === 'DELETE') {
            this.deleteBookmarkState(centerId);
          } else {
            return res.json();
          }
        }
      })
      .then((data) => {
        if (typeof data === 'object') {
          this.postBookmarkState(data);
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  deleteBookmarkState(centerId) {
    let newBookmarkState = Object.assign([], this.props.bookmark);
    let index = this.checkBookmark(centerId)[1];
    newBookmarkState.splice(index, 1);
    this.props.controlBookmark(newBookmarkState);
  }

  postBookmarkState(centerInfo) {
    let newBookmarkState = Object.assign([], this.props.bookmark);
    newBookmarkState.push(centerInfo);
    this.props.controlBookmark(newBookmarkState);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.mypageText}>MyPage</Text>
          <LogoutContainer />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.user}>{this.state.username}</Text>
          <Text style={{ color: '#62CCAD', fontWeight: 'bold', fontSize: 20 }}>
            님
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('MyInfo');
            }}
          >
            {<Entypo name='chevron-right' size={26} color={'#62CCAD'} />}
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
              this.props.navigation.navigate('BookMarkContainer');
            }}
          >
            <Text style={styles.itemText}>즐겨찾기</Text>
            {<Entypo name='chevron-right' size={40} color={'#62CCAD'} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
              this.props.navigation.navigate('MyReviews');
            }}
          >
            <Text style={styles.itemText}>리뷰관리</Text>
            {<Entypo name='chevron-right' size={40} color={'#62CCAD'} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
              this.props.navigation.navigate('MyBookings');
            }}
          >
            <Text style={styles.itemText}>예약관리</Text>
            {<Entypo name='chevron-right' size={40} color={'#62CCAD'} />}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingTop: '12%',
    paddingLeft: '6%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mypageText: {
    marginTop: 30,
    height: 40,
    color: '#62CCAD',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: '2%',
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
    fontWeight: 'bold',
    fontSize: 20,
  },
  list: {
    padding: 10,
  },
  listItem: {
    borderColor: '#62CCAD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 3,
    padding: '6%',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#62CCAD',
  },
});

export default Mypage;
