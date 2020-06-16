import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { HeaderTitle } from 'react-navigation-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class BookingDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2020-06-11',
      time: '10:00-11:00',
      clientName: '테스트',
      clientPhone: '010-1234-5678',
      reason: `상담 이유....가 나 다 라 마 바 사 아 자 차 카 타 파 하
글자수 제한은
지금 대충 600자 넘었다
일단 이유에만 스크롤을 넣어놓자.
이 편지는 영국에서 최초로 시작되어 일년에 한 바퀴 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다. 영국에서 HGXWCH이라는 사람은 1930년에 이 편지를 받았습니다. 그는 비서에게 복사해서 보내라고 했습니다. 며칠 뒤에 복권이 당첨되어 20억을 받았습니다. 어떤 이는 이 편지를 받았으나 96시간 이내 자신의 손에서 떠나야 한다는 사실을 잊었습니다. 그는 곧 사직되었습니다. 나중에야 이 사실을 알고 7통의 편지를 보냈는데 다시 좋은 직장을 얻었습니다. 미국의 케네디 대통령은 이 편지를 받았지만 그냥 버렸습니다. 결국 9일 후 그는 암살 당했습니다. 기억해 주세요. 이 편지를 보내면 7년의 행운이 있을 것이고 그렇지 않으면 3년의 불행이 있을 것입니다. 그리고 이 편지를 버리거나 낙서를 해서는 절대로 안됩니다. 7통입니다. 이 편지를 받은 사람은 행운이 깃들 것입니다. 힘들겠지만 좋은게 좋다고 생각하세요. 7년의 행운을 빌면서...`,
    };
  }

  render() {
    const { date, time, clientName, clientPhone, reason } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.bucket}>
          <Text style={styles.section}>날짜</Text>
          <Text style={styles.info}>{date}</Text>
        </View>
        <View style={styles.bucket}>
          <Text style={styles.section}>시간</Text>
          <Text style={styles.info}>{time}</Text>
        </View>
        <View style={styles.bucket}>
          <Text style={styles.section}>이름</Text>
          <Text style={styles.info}>{clientName}</Text>
        </View>
        <View style={styles.bucket}>
          <Text style={styles.section}>연락처</Text>
          <Text style={styles.info}>{clientPhone}</Text>
        </View>
        <View style={styles.reason}>
          <Text style={styles.section}>상담 이유</Text>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <Text style={{ fontSize: 18, padding: 10 }}>{reason}</Text>
          </ScrollView>
        </View>
        <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.Button} onPress={() => {}}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>완료</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button} onPress={() => {}}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>미완료</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '4%',
  },
  section: {
    color: '#62CCAD',
    fontSize: 20,
    paddingRight: 20,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 18,
  },
  bucket: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  reason: {
    paddingTop: 10,
    height: '60%',
  },
  Button: {
    marginTop: 9,
    marginRight: 10,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#62CCAD',
    borderRadius: 10,
  },
});
