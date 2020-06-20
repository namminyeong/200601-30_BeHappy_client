import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();

// import ShowStarRateAvg from './ShowStarRateAvg';
// import ShowReviews from './ShowReviews';
// import DeviceStorage from '../../../service/DeviceStorage';


export default class CenterReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRateFilter: 0,
      reviewsData: [],
      stars: [5, 4, 3, 2, 1],
      reviews: []
    };
  this.handleReviews = this.handleReviews.bind(this)
  }

  handleRateFilter = (value) => {
    this.setState({isRateFilter: value});
  };

  componentDidMount() {
      const {CenterInfo,token } =this.props
      let url = ec2 + '/review/center?centerId=' +CenterInfo.id
      fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => { 
          if(res.status === 200) {
            return res.json();
          } return ''
        })
        .then((data) => {
          if (typeof data === 'object') {
            this.handleReviews(data)
          }
        })
        .catch((error) => {
          console.log('error', error);
        });
  }

  handleReviews(reviews) {
      console.log('reviews',reviews)
    this.setState({
        reviews
    })
  }


  render() {
    const { isRateFilter,stars } = this.state;
    const reviewsData = this.state?.reviewsData || [];

    return (
      <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false} ref='_scrollView'>

          <View style={{ marginTop: 20, paddingLeft: '4%', paddingRight: '4%', backgroundColor: 'white' }}>
            <RNPickerSelect
              placeholder={{ label: '전체 리뷰', value: 0 }}
              onValueChange={(value) => this.handleRateFilter(value)}
              items={stars.map((ele) => {
                return { label: `${ele}점`, value: `${ele}` };
              })}
            />
          </View>
          {/* <ShowReviews reviewsData={reviewsData} isRateFilter={isRateFilter} /> */}
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
    marginTop: '6%',
    marginBottom: '2%',
  },
  
  review: {
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomColor: '#B2BEC3',
    borderBottomWidth: 2,
  },
  rateStar: { flexDirection: 'row', alignItems: 'center', paddingBottom: 5 },
});
