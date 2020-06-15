import React, { Fragment } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DetailHomeBody from './DetailHomeBody';
import DetailReviews from './DetailReviews';
import Booking from './Booking';
import * as Linking from 'expo-linking';

const Tab = createMaterialTopTabNavigator();

const tags = [{ name: '불면증' }, { name: '스트레스' }];
const rateAvg = '4.0';

class DetailsHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = { bookmark: this.props.navigation.state.params.bookmark };

    this.call = this.call.bind(this);
    this.bookmark = this.bookmark.bind(this);
    this.handleBookmarkColor = this.handleBookmarkColor.bind(this);
  }

  call() {
    Linking.openURL(
      `tel:${this.props.navigation.state.params.theCenterInfo.phone}`
    );
  }

  bookmark() {
    const {
      postDeletebookmark,
      bookmark,
      theCenterInfo,
    } = this.props.navigation.state.params;
    postDeletebookmark(bookmark, theCenterInfo.id);
    this.handleBookmarkColor();
  }

  handleBookmarkColor() {
    this.setState({
      bookmark: !this.state.bookmark,
    });
  }

  render() {
    const { theCenterInfo } = this.props.navigation.state.params;
    const { bookmark } = this.state;

    return (
      <Fragment>
        <View style={styles.container}>
          <Text style={styles.centerName}>{theCenterInfo.centerName}</Text>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            {/* {theCenterInfo.tags.map((tag) => (
            <Text>#{tag.name}</Text>
          ))} */}
            {tags.map((tag) => (
              <Text style={styles.tag} key={tag.name}>
                #{tag.name}
              </Text>
            ))}
          </View>
          <Text style={styles.review}>
            평점{' '}
            <Text>
              {/* {theCenterInfo.rateAvg} */}
              {rateAvg}
            </Text>
          </Text>
        </View>

        <View style={styles.iconBox}>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View style={styles.iconSet}>
              <MaterialCommunityIcons
                name='phone'
                color='black'
                size={40}
                onPress={this.call}
              />
              <Text
                style={{
                  textAlign: 'center',
                }}
              >
                전화하기
              </Text>
            </View>
            <View style={styles.iconSet}>
              <MaterialCommunityIcons
                name='bookmark'
                color={bookmark ? 'black' : 'lightgrey'}
                size={40}
                onPress={this.bookmark}
              />
              <Text
                style={{
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                저장하기
              </Text>
            </View>
          </View>
        </View>
        <Tab.Navigator
          tabBarOptions={{
            labelStyle: { fontSize: 15 },
            tabStyle: { width: 70 },
            // style: { backgroundColor: 'white' },
          }}
        >
          <Tab.Screen
            name='홈'
            component={DetailHomeBody}
            initialParams={this.props.navigation.state.params.theCenterInfo}
          />
          <Tab.Screen name='리뷰' component={DetailReviews} />
          <Tab.Screen name='예약' component={Booking} />
        </Tab.Navigator>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerName: {
    top: 20,
    fontSize: 28,
    height: 70,
  },
  tag: {
    fontSize: 15,
    color: 'white',
    paddingHorizontal: 6,
    borderRadius: 10,
    marginHorizontal: 4,
    backgroundColor: '#62CCAD',
  },
  review: {
    marginVertical: 10,
    fontSize: 25,
  },
  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  iconSet: {
    flexDirection: 'column',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsHome;
