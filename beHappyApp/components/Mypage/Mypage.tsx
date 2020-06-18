import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LogoutContainer from '../../containers/LogoutContainer';

class Mypage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'test',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.mypageText}>오늘도 좋은 하루 되세요</Text>
          <MaterialCommunityIcons
            name='weather-sunny'
            color='brown'
            size={23}
            style={{ top: 18 }}
          />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.user}>{this.props.username}</Text>
          <Text style={{ fontSize: 20 }}>님</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('MyInfo', {
                username: this.props.username,
                phone: this.props.phone,
              });
            }}
          >
            {<Entypo name='chevron-right' size={23} color={'black'} />}
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignSelf: 'center',
            width: '98%',
            marginVertical: '2%',
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
            {/* {<Entypo name='chevron-right' size={40} color={'black'} />} */}
          </TouchableOpacity>
          <View
            style={{
              alignSelf: 'center',
              width: '98%',
              height: 1,
              backgroundColor: '#f5f5f5',
            }}
          />

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
            {/* {<Entypo name='chevron-right' size={40} color={'black'} />} */}
          </TouchableOpacity>
          <View
            style={{
              alignSelf: 'center',
              width: '98%',
              height: 1,
              backgroundColor: '#f5f5f5',
            }}
          />

          <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
              this.props.navigation.navigate('MyBookings');
            }}
          >
            <MaterialCommunityIcons
              name='calendar'
              color='black'
              size={25}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.itemText}>예약관리</Text>
            {/* {<Entypo name='chevron-right' size={40} color={'black'} />} */}
          </TouchableOpacity>
          <View
            style={{
              alignSelf: 'center',
              width: '98%',
              height: 1,
              backgroundColor: '#f5f5f5',
            }}
          />

          <LogoutContainer />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    paddingTop: '12%',
    paddingLeft: '10%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mypageText: {
    marginTop: 30,
    height: 30,
    color: 'black',
    fontSize: 17,
    paddingTop: '2%',
  },
  userInfo: {
    marginBottom: 20,
    paddingLeft: '8%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    paddingLeft: 10,
    fontSize: 20,
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
