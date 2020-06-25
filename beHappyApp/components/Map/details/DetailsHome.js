import React, { Fragment } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DetailHomeBody from './DetailHomeBody';
import DetailReviewsContainer from '../../../containers/DetailReviewsContainer';
import DetailBookingContainer from '../../../containers/DetailBookingContainer';

import * as Linking from 'expo-linking';
import DetailsMiniStarRateAvg from './DetailsMiniStarRateAvg';

const Tab = createMaterialTopTabNavigator();

class DetailsHome extends React.Component {
  constructor(props) {
    super(props);

    this.call = this.call.bind(this);
    this.bookmark = this.bookmark.bind(this);
  }

  call() {
    Linking.openURL(`tel:${this.props.theCenterInfo.phone}`);
  }

  bookmark() {
    const { postDeletebookmark, theCenterInfo } = this.props;
    postDeletebookmark(this.props.bookmark, theCenterInfo.id);
  }

  render() {
    const { theCenterInfo } = this.props;

    return (
      <Fragment>
        <View style={styles.container}>
          <Text
            style={
              theCenterInfo.centerName.length > 15
                ? styles.centerNameLong
                : styles.centerName
            }
          >
            {theCenterInfo.centerName}
          </Text>

          {theCenterInfo.rateAvg === 0 ? (
            <View style={styles.noReviewContainer}>
              <Text style={styles.noReview}>아직 리뷰가 없습니다</Text>
            </View>
          ) : (
            <>
              <View style={styles.reviewContainer}>
                <Text style={styles.rate}>
                  {theCenterInfo.rateAvg.toFixed(1)}
                </Text>
                <Text style={styles.text}>/5 </Text>
                <View style={styles.star}>
                  <DetailsMiniStarRateAvg rateAvg={theCenterInfo.rateAvg} />
                </View>
              </View>
            </>
          )}

          <View style={styles.iconBox}>
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
                color={this.props.bookmark ? '#62CCAD' : 'lightgrey'}
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

        <View style={{ borderBottomWidth: 0.5, borderColor: 'lightgrey' }} />

        <Tab.Navigator
          tabBarOptions={{
            labelStyle: { fontSize: 17, color: 'black', fontWeight: 'bold' },
            tabStyle: { width: 70 },
            activeTintColor: 'white',
            indicatorStyle: { backgroundColor: '#62CCAD' },
          }}
        >
          <Tab.Screen
            name='홈'
            component={DetailHomeBody}
            initialParams={theCenterInfo}
          />
          <Tab.Screen
            name='리뷰'
            component={DetailReviewsContainer}
            initialParams={theCenterInfo}
          />
          <Tab.Screen
            name='예약'
            component={DetailBookingContainer}
            initialParams={theCenterInfo}
          />
        </Tab.Navigator>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '30%',
    paddingTop: '15%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  centerNameLong: {
    letterSpacing: -1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  noReviewContainer: {
    marginTop: '4%',
    fontSize: 17,
  },
  noReview: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
  reviewContainer: {
    width: 260,
    marginTop: '2%',
    fontSize: 17,
    flexDirection: 'row',
  },
  rate: {
    fontWeight: 'bold',
    fontSize: 20,
    width: 40,
    textAlign: 'right',
  },
  text: {
    fontSize: 20,
  },
  star: {
    left: 3,
  },
  iconBox: {
    marginTop: '4%',
    flexDirection: 'row',
  },
  iconSet: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsHome;
