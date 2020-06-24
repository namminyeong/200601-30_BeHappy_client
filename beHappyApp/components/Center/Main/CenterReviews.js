import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ShowReviews from './ShowReviews';

export default class CenterReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRateFilter: 0,
    };
  }

  handleRateFilter(value) {
    this.setState({ isRateFilter: value });
  }

  render() {
    const { isRateFilter } = this.state;
    const reviewsData = this.props.reviewsData;
    const stars = [5, 4, 3, 2, 1];

    return (
      <View style={styles.container}>
        <View style={styles.filter}>
          <RNPickerSelect
            placeholder={{ label: '전체 리뷰', value: 0 }}
            onValueChange={(value) => this.handleRateFilter(value)}
            items={stars.map((ele) => {
              return { label: `${ele}점`, value: `${ele}` };
            })}
          />
        </View>
        <Text style={{ fontSize: 10, color: 'darkgrey', marginLeft: '3%' }}>
          최근 작성된 리뷰부터 보여집니다.
        </Text>

        <ScrollView showsHorizontalScrollIndicator={false} ref='_scrollView'>
          <ShowReviews
            reviewsData={reviewsData}
            isRateFilter={isRateFilter}
            drawStars={this.props.drawStars}
          />
        </ScrollView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 10,
            bottom: 6,
            opacity: 0.1,
          }}
          onPress={() => {
            this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
          }}
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
    marginBottom: '1%',
  },
  filter: {
    backgroundColor: 'white',
    height: 45,
    marginTop: 5,
    paddingLeft: '4%',
    paddingRight: '2%',
    marginBottom: 3,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
    borderRadius: 5,
    justifyContent: 'center',
  },
  review: {
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomColor: '#B2BEC3',
    borderBottomWidth: 2,
  },
  rateStar: { flexDirection: 'row', alignItems: 'center', paddingBottom: 5 },
});
