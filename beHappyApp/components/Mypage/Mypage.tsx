import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import Logout from '../../containers/LogoutContainer'

const username = 'minyeong';

class Mypage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.mypageText}>MyPage</Text>
          <Logout />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.user}>{username}</Text>
          <Text style={{ color: '#62CCAD', fontWeight: 'bold', fontSize: 20, }}>님</Text>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('MyInfo') }}>
            {<Entypo name="chevron-right" size={26} color={'#62CCAD'} />}
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <TouchableOpacity style={styles.listItem} onPress={() => { this.props.navigation.navigate('MyBookmarks') }} >
            <Text style={styles.itemText}>즐겨찾기</Text>
            {<Entypo name="chevron-right" size={40} color={'#62CCAD'} />}
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={() => { this.props.navigation.navigate('MyReviews') }} >
            <Text style={styles.itemText}>리뷰관리</Text>
            {<Entypo name="chevron-right" size={40} color={'#62CCAD'} />}
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={() => { this.props.navigation.navigate('MyBookings') }} >
            <Text style={styles.itemText}>예약관리</Text>
            {<Entypo name="chevron-right" size={40} color={'#62CCAD'} />}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
  }
});

export default Mypage;