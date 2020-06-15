import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ShowStarRate from './ShowStarRate';
import { FlatList } from 'react-native-gesture-handler';

export default class ShowReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  render() {
    const { isRateFilter, reviewsData } = this.props;
    const renderableData =
      isRateFilter === 0
        ? reviewsData
        : reviewsData.filter((data) => {
            return data.rate === Number(isRateFilter);
          });

    return (
      <View style={{ marginLeft: '4%', marginRight: '4%' }}>
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={renderableData}
          renderItem={({ item }) => {
            return (
              <View style={styles.review}>
                <ShowStarRate data={item} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5 }}>
                  <Text>{item.anonymousName}</Text>
                  <Text style={{ color: '#636E72' }}>{item.date} 방문</Text>
                </View>
                <Text>{item.content}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  review: {
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomColor: '#B2BEC3',
    borderBottomWidth: 2,
  },
  rateStar: { flexDirection: 'row', alignItems: 'center', paddingBottom: 5 },
});
