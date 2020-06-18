import React, { Fragment } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DetailHomeBody from './DetailHomeBody';
import DetailReviews from './DetailReviews';
import Booking from './Booking';
import * as Linking from 'expo-linking';
import DetailsMiniStarRateAvg from './DetailsMiniStarRateAvg';

const Tab = createMaterialTopTabNavigator();

class DetailsHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = { bookmark: this.props.route.params.bookmark };

    this.call = this.call.bind(this);
    this.bookmark = this.bookmark.bind(this);
    this.handleBookmarkColor = this.handleBookmarkColor.bind(this);
  }

  call() {
    Linking.openURL(`tel:${this.props.route.params.theCenterInfo.phone}`);
  }

  bookmark() {
    const {
      postDeletebookmark,
      bookmark,
      theCenterInfo,
    } = this.props.route.params;
    postDeletebookmark(bookmark, theCenterInfo.id);
    this.handleBookmarkColor();
  }

  handleBookmarkColor() {
    this.setState({
      bookmark: !this.state.bookmark,
    });
  }

  render() {
    const { theCenterInfo } = this.props.route.params;
    const { bookmark } = this.state;
    return (
      <Fragment>
        <View style={styles.container}>
          <Text style={styles.centerName}>{theCenterInfo.centerName}</Text>
          <View style={styles.specialtyContainer}>
            {theCenterInfo.specialties.map((specialty) => (
              <Text style={styles.specialty} key={specialty.name}>
                #{specialty.name}
              </Text>
            ))}
          </View>
          {theCenterInfo.rateAvg === 0 ? (
            <View style={styles.noReviewContainer}>
              <Text style={styles.noReview}>아직 리뷰가 없습니다</Text>
            </View>
          ) : (
            <>
              <View style={styles.reviewContainer}>
                <Text style={styles.rate}>{theCenterInfo.rateAvg}/5 </Text>
                <View style={styles.star}>
                  <DetailsMiniStarRateAvg rateAvg={theCenterInfo.rateAvg} />
                </View>
              </View>
            </>
          )}
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
            labelStyle: { fontSize: 15, color: 'white' },
            tabStyle: { width: 70 },
            style: { backgroundColor: '#62CCAD' },
            activeTintColor: 'white',
            indicatorStyle: { backgroundColor: 'white' },
          }}
        >
          <Tab.Screen
            name='홈'
            component={DetailHomeBody}
            initialParams={this.props.route.params.theCenterInfo}
          />
          <Tab.Screen
            name='리뷰'
            component={DetailReviews}
            initialParams={this.props.route.params.theCenterInfo}
            options={{}}
          />
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
    top: 35,
    fontSize: 28,
    height: 70,
  },
  specialtyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    top: 10,
  },
  specialty: {
    fontSize: 15,
    color: 'white',
    paddingHorizontal: 6,
    borderRadius: 10,
    marginHorizontal: 4,
    backgroundColor: '#62CCAD',
  },
  noReviewContainer: {
    marginTop: 23,
    marginBottom: 15,
    fontSize: 17,
  },
  reviewContainer: {
    width: 235,
    marginTop: 20,
    marginBottom: 12,
    fontSize: 17,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  rate: {
    fontSize: 20,
    width: 50,
    textAlign: 'center',
  },
  star: {
    left: 3,
  },
  noReview: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
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
