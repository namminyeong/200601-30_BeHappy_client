import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import getEnvVars from '../../../environment';
import Entypo from 'react-native-vector-icons/Entypo';
const { ec2 } = getEnvVars();
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ReviewGraph from './ReviewGraph';
import CenterReviews from './CenterReviews';
import Moment from 'moment';

export default class CenterMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewsData: [],
      totalAvg: 0,
      reviewCountOfEachRate: {},
      totalCount: 0,
      xAxisData: [],
      rateAvgOfEachMonth: [],
    };

    this.saveReviews = this.saveReviews.bind(this);
    this.drawStars = this.drawStars.bind(this);
    this.getDataForGraph = this.getDataForGraph.bind(this);
    this.saveDataForGraph = this.saveDataForGraph.bind(this);
  }

  componentDidMount() {
    const { CenterInfo, token } = this.props;

    let url = ec2 + '/review/center?centerId=' + CenterInfo.id;
    fetch(url, {
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
      .then((data) => {
        if (typeof data === 'object') {
          this.saveReviews(data);
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
    this.getDataForGraph(CenterInfo.id);
  }

  getDataForGraph(id) {
    let today = Moment(new Date().setMonth(new Date().getMonth() + 1)).format(
      'YYYY-MM'
    );
    let past = Moment(new Date().setMonth(new Date().getMonth() - 3)).format(
      'YYYY-MM'
    );
    let start = `${past}-01`;
    let end = `${today}-01`;
    let url =
      ec2 +
      '/review/analysis?centerId=' +
      id +
      '&startDate=' +
      start +
      '&endDate=' +
      end;
    fetch(url, {
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
        if (typeof data === 'object') {
          this.saveDataForGraph(data);
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  saveDataForGraph(data) {
    let totalCount = Object.keys(data.reviewCountOfEachRate).reduce(
      (acc, cur) => {
        return acc + data.reviewCountOfEachRate[cur];
      },
      0
    );
    let xAxisData = [];
    let month = new Date().getMonth() + 1;
    while (xAxisData.length < 4) {
      let willUnshift = month - xAxisData.length;
      willUnshift = willUnshift < 0 ? 12 + willUnshift : willUnshift;
      xAxisData.unshift(willUnshift);
    }

    let reviewCountOfEachMonth = [];
    let rateAvgOfEachMonth = xAxisData.map((month, index) => {
      let keys = Object.keys(data.rateAvgOfEachMonth);
      let keysToMonth = keys.map((key) => Number(key.slice(5)));
      if (keysToMonth.indexOf(month) !== -1) {
        reviewCountOfEachMonth.push(
          data.reviewCountOfEachMonth[keys[keysToMonth.indexOf(month)]]
        );
        return +data.rateAvgOfEachMonth[
          keys[keysToMonth.indexOf(month)]
        ].toFixed(1);
      } else {
        reviewCountOfEachMonth.push(0);
        return 0;
      }
    });

    this.setState({
      rateAvgOfEachMonth,
      reviewCountOfEachMonth,
      reviewCountOfEachRate: data.reviewCountOfEachRate,
      totalAvg: data.totalAvg.toFixed(1),
      totalCount,
      xAxisData,
    });
  }

  saveReviews(reviewsData) {
    this.setState({
      reviewsData: reviewsData.reverse(),
    });
  }

  drawStars(rate, size) {
    let stars = [];
    while (stars.length < 5) {
      if (rate > 0) {
        stars.push(
          <FontAwesome
            name='star'
            key={'full' + rate.toString()}
            size={size}
            style={{ color: '#D61A3C', paddingRight: 3 }}
          />
        );
      } else {
        stars.push(
          <FontAwesome
            name='star-o'
            key={'o' + rate.toString()}
            size={size}
            style={{ color: '#B2BEC3', paddingRight: 3 }}
          />
        );
      }
      rate -= 1;
    }
    return stars;
  }

  render() {
    const stars = [5, 4, 3, 2, 1];
    let MaxRateCount = Object.values(this.state.reviewCountOfEachRate).sort(
      (a, b) => b - a
    )[0];

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('CenterInfo', {
              token: this.props.token,
              controlLogin: this.props.controlLogin,
            })
          }
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.centerName}>
              {this.props.CenterInfo.centerName}
            </Text>
            {
              <Entypo
                name='chevron-right'
                size={26}
                color={'black'}
                style={{ alignSelf: 'center' }}
              />
            }
          </View>
        </TouchableOpacity>

        <View style={styles.rateAvgContainer}>
          <View
            style={{
              width: '45%',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#636E72' }}>
              참여 {this.state.reviewsData.length}명
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                {this.state.totalAvg}
              </Text>
              <Text style={{ fontSize: 24, color: '#636E72' }}> / 5</Text>
            </View>
            <View style={styles.rateStar}>
              {this.drawStars(this.state.totalAvg, 24)}
            </View>
          </View>
          <View
            style={{
              marginLeft: 10,
              marginRight: 10,
              borderLeftWidth: 1,
              borderColor: '#B2BEC3',
              height: 83,
            }}
          />
          <View style={styles.barGraphContainer}>
            {stars.map((rate) => {
              return (
                <View style={styles.barRow} key={'point' + rate}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 90,
                    }}
                  >
                    <Text style={styles.rateColumn}>{rate}점</Text>
                    <View
                      style={{
                        maxWidth: 55,
                        width: `${Math.round(
                          (this.state.reviewCountOfEachRate[rate] /
                            MaxRateCount) *
                            55
                        )}%`,
                        height: 8,
                        backgroundColor: '#D61A3C',
                      }}
                    />
                  </View>
                  <Text style={{ top: -2, fontSize: 12 }}>
                    {this.state.reviewCountOfEachRate[rate]}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <ReviewGraph
          rateAvgOfEachMonth={this.state.rateAvgOfEachMonth}
          xAxisData={this.state.xAxisData}
          reviewCountOfEachMonth={this.state.reviewCountOfEachMonth}
        />

        <CenterReviews
          CenterInfo={this.props.CenterInfo}
          token={this.props.token}
          reviewsData={this.state.reviewsData}
          drawStars={this.drawStars}
        />

        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 20,
    paddingTop: 50,
    flex: 1,
  },
  centerName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  rateAvgContainer: {
    marginTop: 30,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: '4%',
    marginRight: '4%',
  },
  rateStar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    marginBottom: 10,
  },
  barGraphContainer: {
    paddingLeft: 15,
    width: 150,
    marginRight: -30,
  },
  barRow: {
    flexDirection: 'row',
    height: 16,
  },
  rateColumn: {
    fontSize: 12,
    paddingRight: 10,
    color: '#636E72',
    fontWeight: 'bold',
  },
  logoutText: {
    position: 'absolute',
    top: -20,
    alignSelf: 'flex-end',
    color: '#62CCAD',
    fontWeight: 'bold',
    backgroundColor: 'pink',
  },
});
