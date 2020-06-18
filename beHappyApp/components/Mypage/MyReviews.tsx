import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Button } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();

class MyReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myReviews: [],
      isLoading: false,
    };
    this.handleMyReviewInState = this.handleMyReviewInState.bind(this);
    this.drawStars = this.drawStars.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.goToMarker = this.goToMarker.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
  }

  handleLoading(status) {
    this.setState({
      isLoading: status,
    });
  }
  componentDidMount() {
    this.handleLoading(true);
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
          this.handleLoading(false);
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

  goToMarker(centerId) {
    let url = ec2 + '/center?centerId=' + centerId;
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
          console.log('datat', data);
          this.props.controlCoordinate(data.latitude, data.longitude);
          this.props.controlBookmarkClicked(true);
          this.props.controlCenterData([data], [data]);
          this.props.navigation.navigate('MapStack', {
            screen: 'MapContainer',
          });
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  deleteReview(index) {
    console.log('deleteReview');
    let newState = Object.assign([], this.state.myReviews);
    newState.splice(index, 1);
    this.setState({
      myReviews: newState,
    });
  }

  render() {
    const { myReviews, isLoading } = this.state;
    return (
      <>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size='large' color='#0000ff' />
          </View>
        ) : (
          <View style={styles.container}>
            <ScrollView>
              {myReviews.map((review, index) => (
                <View style={styles.review}>
                  <View style={styles.buttons}>
                    <Button
                      small
                      transparent
                      style={styles.modifyDeleteButton}
                      onPress={() => {
                        this.props.navigation.navigate('ModifyReview', {
                          review,
                        });
                      }}
                    >
                      <SimpleLineIcons name='pencil' size={23} />
                    </Button>
                    <Button
                      small
                      transparent
                      style={styles.modifyDeleteButton}
                      onPress={() => this.deleteReview(index)}
                    >
                      <FontAwesome name='trash-o' size={23} />
                    </Button>
                  </View>
                  <Text>진료일자 : {review.date}</Text>
                  <Text
                    style={styles.centername}
                    onPress={() => this.goToMarker(review.centerId)}
                  >
                    {review.centerName}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.rate}>
                      {this.drawStars(review.rate)}
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    {review.specialties.map((specialty) => (
                      <Text style={styles.specialty}>#{specialty}</Text>
                    ))}
                  </View>
                  <Text numberOfLines={3} style={styles.content}>
                    {review.content}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  review: {
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 15,
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
  buttons: {
    marginTop: 10,
    position: 'absolute',
    right: 10,
    flexDirection: 'row',
  },
  modifyDeleteButton: {
    flexDirection: 'column',
    marginLeft: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    width: 40,
    height: 50,
  },
  modifyDeleteText: {
    fontSize: 12,
    width: '100%',
    textAlign: 'center',
  },
  centername: {
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
    marginVertical: 6,
    fontSize: 18,
    fontWeight: 'bold',
  },
  rate: {
    flexDirection: 'row',
  },
  specialty: {
    fontSize: 14,
    marginTop: 3,
    color: 'white',
    marginRight: 8,
    paddingVertical: 1,
    backgroundColor: '#62CCAD',
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  content: {
    marginTop: 17,
    marginBottom: 10,
    fontSize: 14,
  },
});

export default MyReviews;
