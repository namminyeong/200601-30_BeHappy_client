import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ListView, FlatList, ScrollView } from 'react-native'

const username = 'test'
const usermobile = '010-1234-5678'
const city = '서울시'
const district = '강남구'


class MyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: ['스트레스', '가족', '식이', '부부', '우울증', '불면증', '학교폭력', '아동', '불안', '강박'],
    }
  }
  render() {
    return (
      <View style={styles.container} >
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View>
            <View style={styles.nameStyle}>
              <Text style={styles.section}>이름</Text>
              <Text style={styles.info}>{username}</Text>
            </View>
            <View style={styles.mobileStyle}>
              <Text style={styles.section}>연락처</Text>
              <Text style={styles.info}>{usermobile}</Text>
            </View>
          </View>

          <View style={{ width: "100%", borderBottomWidth: 2, borderColor: '#62CCAD' }} />
          <View style={styles.preference}>
            <Text style={styles.section}>Preference</Text>

            <Text style={styles.preSection}>관심분야</Text>
            <View style={styles.attention}>
              {this.state.datas.map((data) => (
                <TouchableOpacity style={styles.hashtagButton} onPress={() => { }}>
                  <Text style={{ color: 'white' }}>#{data}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.preSection}>지역</Text>
            <View style={styles.area}>
              <TouchableOpacity style={styles.areaButton} onPress={() => { }}>
                <Text style={{ color: 'white' }} >{city}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.favorButton} onPress={() => { }}>
                <Text style={{ color: 'white' }} >{district}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.preSection}>선호센터</Text>
            <View style={styles.favor}>
              <TouchableOpacity style={styles.favorButton} onPress={() => { }}>
                <Text style={{ color: 'white' }} >정신과</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.favorButton} onPress={() => { }}>
                <Text style={{ color: 'white' }} >심리센터</Text>
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
              <TouchableOpacity style={styles.modifyButton} onPress={() => { }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }} >수정</Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '4%',

    //backgroundColor: 'white'
  },
  section: {
    color: '#62CCAD',
    fontSize: 20,
    paddingRight: 20,
    fontWeight: 'bold',

    //backgroundColor: 'black'

  },
  info: {
    fontSize: 18,
  },
  nameStyle: {
    marginTop: '2%',
    //height: 40,
    flexDirection: 'row',
  },
  mobileStyle: {
    height: 40,
    flexDirection: 'row',
  },
  preference: {
    marginTop: '4%',
  },
  preSection: {
    marginTop: '2%',
    paddingLeft: 6,
    color: '#62CCAD',
    fontSize: 16,
    fontWeight: 'bold',

  },
  attention: {
    marginLeft: '2%',
    marginRight: '2%',
    paddingBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  hashtagButton: {
    marginTop: 9,
    marginRight: 10,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#62CCAD',
    borderRadius: 10,
  },
  area: {
    marginLeft: '2%',
    marginRight: '2%',
    paddingBottom: 10,
    flexDirection: 'row',
  },
  areaButton: {
    marginTop: 9,
    marginRight: 10,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#62CCAD',
    borderRadius: 10,
  },
  favor: {
    flexDirection: 'row',
    paddingBottom: 10,
    marginLeft: '2%',
    marginRight: '2%',
  },
  favorButton: {
    marginTop: 9,
    marginRight: 10,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#62CCAD',
    borderRadius: 10,
  },
  modifyButton: {
    marginTop: '20%',
    marginRight: 10,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#62CCAD',
    borderRadius: 10,
  }
})

export default MyInfo;