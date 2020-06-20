import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import getEnvVars from '../../../environment';
import Entypo from 'react-native-vector-icons/Entypo';
const { ec2 } = getEnvVars();
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ReviewGraph from './ReviewGraph';
import CenterReviews from './CenterReviews';

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

    this.handleReviews = this.handleReviews.bind(this);
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
          this.handleReviews(data);
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
    this.getDataForGraph(CenterInfo.id);
  }

  getDataForGraph(id) {
    let pastYear =
      new Date().getMonth() < 3
        ? new Date().getFullYear() - 1
        : new Date().getFullYear();
    let pastMonth =
      new Date().getMonth() < 3
        ? 10 + new Date().getMonth()
        : '0' + (new Date().getMonth() - 2);

    let fourmonthBefore = `${pastYear}-${pastMonth}-01`;
    let thisMonth = `${new Date().getFullYear()}-${
      new Date().getMonth() + 2 < 10
        ? '0' + (new Date().getMonth() + 2)
        : new Date().getMonth() + 2
    }-01`;
    let url =
      ec2 +
      '/review/analysis?centerId=' +
      id +
      '&startDate=' +
      fourmonthBefore +
      '&endDate=' +
      thisMonth;
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
          console.log('data', data);
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
    let count = 0;
    let rateAvgOfEachMonth = xAxisData.map((month, index) => {
      let keys = Object.keys(data.rateAvgOfEachMonth);
      if (4 - index > keys.length) {
        count += 1;
        return 0;
      }
      return +data.rateAvgOfEachMonth[keys[index - count]].toFixed(1);
    });
    this.setState({
      rateAvgOfEachMonth,
      reviewCountOfEachMonth: data.reviewCountOfEachMonth,
      reviewCountOfEachRate: data.reviewCountOfEachRate,
      totalAvg: data.totalAvg.toFixed(1),
      totalCount,
      xAxisData,
    });
  }

  handleReviews(reviewsData) {
    this.setState({
      reviewsData,
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

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('CenterInfo', {
              token: this.props.token,
              controlLogin: this.props.controlLogin,
              centerName: this.props.CenterInfo.centerName,
            })
          }
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.centerName}>
              {this.props.CenterInfo.centerName}
            </Text>
            {<Entypo name='chevron-right' size={26} color={'black'} />}
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
          <View
            style={{
              paddingLeft: 15,
              width: 150,
              marginRight: -30,
            }}
          >
            {stars.map((rate) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    height: 16,
                  }}
                >
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
                        maxWidth: 60,
                        width: `${Math.round(
                          (this.state.reviewCountOfEachRate[rate] /
                            this.state.totalCount) *
                            100
                        )}%`,
                        height: 8,
                        backgroundColor: '#D61A3C',
                      }}
                    />
                  </View>
                  <Text>{this.state.reviewCountOfEachRate[rate]}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <ReviewGraph
          rateAvgOfEachMonth={this.state.rateAvgOfEachMonth}
          xAxisData={this.state.xAxisData}
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
    paddingTop: 40,
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
