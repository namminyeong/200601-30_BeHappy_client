import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
class MyReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myReviews: [],
    };
    this.handleMyReviewInState = this.handleMyReviewInState.bind(this);
    this.drawStars = this.drawStars.bind(this);
  }

  componentDidMount() {
    fetch('http://13.209.16.103:4000/review', {
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
          this.handleMyReviewInState(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleMyReviewInState(myReviews) {
    this.setState({
      myReviews,
    });
  }

  drawStars(rate) {
    let stars = [];
    while (stars.length < 5) {
      if (rate > 0) {
        stars.push(
          <FontAwesome
            name='star'
            key={'full' + rate.toString()}
            size={20}
            style={{ color: '#D61A3C', paddingRight: 3 }}
          />
        );
      } else {
        stars.push(
          <FontAwesome
            name='star-o'
            key={'o' + rate.toString()}
            size={20}
            style={{ color: '#B2BEC3', paddingRight: 3 }}
          />
        );
      }
      rate -= 1;
    }
    return stars;
  }

  render() {
    console.log(this.state.myReviews);
    const { myReviews } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          {myReviews.map((review) => (
            <View style={styles.review}>
              <Text>진료일자 : {review.date}</Text>
              <Text style={styles.centername}>{review.centerName}</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.rate}>{this.drawStars(review.rate)}</View>
                <View style={styles.buttons}>
                  <Button small transparent style={styles.modifyDelete}>
                    <Text style={styles.modifyDeleteText}>수정</Text>
                  </Button>
                  <Button small transparent style={styles.modifyDelete}>
                    <Text style={styles.modifyDeleteText}>삭제</Text>
                  </Button>
                </View>
              </View>
              <Text numberOfLines={3} style={styles.content}>
                {review.content}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  review: {
    backgroundColor: 'white',
    padding: 7,
    left: '2%',
    width: '96%',
    marginTop: 15,
    marginBottom: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centername: {
    marginVertical: 6,
    fontSize: 20,
    fontWeight: 'bold',
  },
  rate: {
    flexDirection: 'row',
  },
  buttons: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginHorizontal: 5,
  },
  modifyDelete: {
    alignItems: 'center',
    marginHorizontal: 5,
    width: 60,
    borderColor: 'black',
    borderWidth: 1,
  },
  modifyDeleteText: {
    width: 57,
    textAlign: 'center',
  },
  content: {
    marginVertical: 10,
    fontSize: 15,
  },
});

export default MyReviews;
