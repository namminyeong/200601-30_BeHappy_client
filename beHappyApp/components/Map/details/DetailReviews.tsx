import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ShowStarRateAvg from './ShowStarRateAvg';
import ShowReviews from './ShowReviews';
import DeviceStorage from '../../../service/DeviceStorage';


export default class DetailsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rateAvg: this.props.route.params.rateAvg,
      isRateFilter: 0,
      reviewsData: [],
    };
    this.getCenterReviews = this.getCenterReviews.bind(this)
  }

  handleRateFilter = (value) => {
    this.setState({isRateFilter: value});
  };

  componentDidMount() {
    DeviceStorage.loadJWT().then((value) => {
      this.getCenterReviews(value);
    });
  }

  getCenterReviews(token) {
    fetch('http://13.209.16.103:4000/review/center?centerId=' + this.props.route.params.id, {
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
      .then((payload) => {
        this.setState({
          reviewsData: payload
        })
      });
  }

  render() {
    const stars = [5, 4, 3, 2, 1]
    const { isRateFilter, rateAvg } = this.state;
    const reviewsData = this.state?.reviewsData || [];
    let reviewCountOfEachRate = stars.map(rate => {
      let count = 0;
      reviewsData.forEach((data) => {if(data.rate === rate){count += 1}})
      return count;
    })
    let copied = Object.assign([],reviewCountOfEachRate)
    let MaxRateCount = copied.sort()[4]

    return (
      <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false} ref='_scrollView'>
          <View style={styles.rateAvg}>
            <View style={{ paddingRight: 20, alignItems: 'center' }}>
              <Text style={{ color: '#636E72' }}>참여 {reviewsData.length}명</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{rateAvg.toFixed(1)}</Text>
                <Text style={{ fontSize: 24, color: '#636E72' }}> / 5</Text>
              </View>
              <ShowStarRateAvg rateAvg={rateAvg} />
            </View>
            <View style={{ marginLeft: 10, marginRight: 10, borderLeftWidth: 2, borderColor: '#B2BEC3' }} />
            <View style={{ paddingLeft: 20, width: 150, marginRight: -24 }}>
              {stars.map((rate,index) => 
                <View key={rate} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ paddingRight: 10, color: '#636E72', fontWeight: 'bold' }}>{rate}점</Text>
                  <View style={{maxWidth: 60, width: `${(reviewCountOfEachRate[index] / MaxRateCount)*45}%`, height: 8, backgroundColor: '#D61A3C' }} />
                </View>
              )}
            </View>
            <View>
              {stars.map(rate =>
                <Text key={rate}>{reviewsData.filter((data) => data.rate === rate).length}</Text>
              )}
            </View>
          </View>

          <View style={{ marginLeft: '4%', marginRight: '4%', marginTop: '4%', height: 2, backgroundColor: '#B2BEC3' }} />

          <View style={{ marginTop: 10, paddingLeft: '4%', paddingRight: '4%'}}>
            <RNPickerSelect
              placeholder={{ label: '전체 리뷰', value: 0}}
              onValueChange={(value) => this.handleRateFilter(value)}
              items={stars.map((ele) => {
                return { label: `${ele}점`, value: `${ele}` };
              })}
            />
          </View>
          <ShowReviews reviewsData={reviewsData} isRateFilter={isRateFilter} />
        </ScrollView>
          <TouchableOpacity
           style={{marginRight: '2%', position: 'absolute', flex: 1, right: 4, bottom: 6, opacity: 0.1, }}
           onPress={() => { this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true}); }}
           >
          <FontAwesome5 name='chevron-circle-up' size={34} />
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '6%',
    marginBottom: '2%',
    backgroundColor: 'white',
  },
  rateAvg: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: '4%',
    marginRight: '4%',
  },
  review: {
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomColor: '#B2BEC3',
    borderBottomWidth: 2,
  },
  rateStar: { flexDirection: 'row', alignItems: 'center', paddingBottom: 5 },
});
