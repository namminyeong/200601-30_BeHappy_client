import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class ShowReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 10,
    };
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  handleLoadMore() {
    this.setState({
      count: this.state.count + 10,
    });
  }

  render() {
    const { isRateFilter, reviewsData } = this.props;
    const renderableData =
      isRateFilter === 0
        ? reviewsData
        : reviewsData.filter((data) => {
            return data.rate === Number(isRateFilter);
          });

    return (
      <View style={{ marginHorizontal: '3%', marginTop: '1%' }}>
        {renderableData.slice(0, this.state.count).map((review, index) => (
          <View style={styles.review} key={index}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text>{review.anonymousName}</Text>
              <Text style={{ color: '#636E72' }}>
                {review.date.slice(0, 4)}.{review.date.slice(5, 7)} 방문
              </Text>
            </View>
            <View style={styles.rateStar}>
              {this.props.drawStars(review.rate, 15)}
            </View>
            <Text style={styles.content}>{review.content}</Text>
          </View>
        ))}
        {renderableData.length <= this.state.count ? (
          <></>
        ) : (
          <TouchableOpacity
            style={styles.loadMore}
            onPress={this.handleLoadMore}
          >
            <Text style={styles.loadMoreText}>더보기</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  review: {
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.5,
  },
  rateStar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    marginBottom: 10,
  },
  content: {
    fontSize: 15,
  },
  loadMore: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreText: {
    fontSize: 17,
    color: 'lightgrey',
  },
});
