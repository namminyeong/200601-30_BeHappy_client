import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import deviceStorage from '../../service/DeviceStorage';
import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();
import ReviewGraph from './ReviewGraph';
import CenterReviews from './CenterReviews';

export default function CenterMain({ controlLogin, token, CenterInfo }) {
  const logoutCenter = () => {
    fetch(ec2 + '/user/logout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((payload) => {
        if (payload.token === '') {
          controlLogin(-1, null);
          deviceStorage.deleteJWT();
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  const stars = [5, 4, 3, 2, 1];
  let reviewsData = [];
  let rateAvg = CenterInfo.rate;
  return (
    <View style={styles.container}>
      <Text style={styles.centerName}>{CenterInfo.centerName}</Text>

      <View style={styles.rateAvgContainer}>
        <View style={{ paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#636E72' }}>참여 {reviewsData.length}명</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{rateAvg}</Text>
            <Text style={{ fontSize: 24, color: '#636E72' }}> / 5</Text>
          </View>
          {/* <ShowStarRateAvg rateAvg={rateAvg} /> */}
        </View>
        <View
          style={{
            marginLeft: 10,
            marginRight: 10,
            borderLeftWidth: 1,
            borderColor: '#B2BEC3',
          }}
        />
        <View style={{ paddingLeft: 20, width: 150, marginRight: -24 }}>
          {stars.map((rate) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.rateColumn}>{rate}점</Text>
              <View
                style={{
                  maxWidth: 60,
                  width: `${Math.round(
                    (reviewsData.filter((data) => data.rate === rate).length /
                      reviewsData.length) *
                      100
                  )}%`,
                  height: 8,
                  backgroundColor: '#D61A3C',
                }}
              />
            </View>
          ))}
        </View>

        <View>
          {stars.map((rate) => (
            <Text>
              {reviewsData.filter((data) => data.rate === rate).length}
            </Text>
          ))}
        </View>
      </View>

      <ReviewGraph />
      <CenterReviews CenterInfo={CenterInfo} token={token} />

      <TouchableOpacity onPress={logoutCenter}>
        <Text style={styles.logoutText}>logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 20,
    paddingTop: 60,
    flex: 1,
  },
  centerName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  rateAvgContainer: {
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: '4%',
    marginRight: '4%',
  },
  rateColumn: {
    paddingRight: 10,
    color: '#636E72',
    fontWeight: 'bold',
  },
  logoutText: {
    marginTop: 20,
    color: '#62CCAD',
    paddingRight: '10%',
    fontWeight: 'bold',
  },
});
