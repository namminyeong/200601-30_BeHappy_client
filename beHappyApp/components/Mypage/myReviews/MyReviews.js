import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { Button } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import getEnvVars from '../../../environment';
const { ec2 } = getEnvVars();
import DeleteReviewModal from './DeleteReviewModal';

class MyReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myReviews: [],
      isLoading: false,
      modalDeleteReviewShown: false,
      willDeleteModal: false,
      deleteIndex: null,
    };
    this.handleMyReviewInState = this.handleMyReviewInState.bind(this);
    this.drawStars = this.drawStars.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.goToMarker = this.goToMarker.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
    this.modifyReview = this.modifyReview.bind(this);
    this.handleModalDeleteReviewShown = this.handleModalDeleteReviewShown.bind(
      this
    );
    this.handelWillDeleteModal = this.handelWillDeleteModal.bind(this);
  }

  handleLoading(status) {
    this.setState({
      isLoading: status,
    });
  }

  componentDidMount() {
    this.handleLoading(true);
    fetch(ec2 + '/review', {
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
          this.handleMyReviewInState(data.reverse());
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
    let reviewId = this.state.myReviews[index].reviewId;
    let newState = Object.assign([], this.state.myReviews);
    fetch(ec2 + '/review', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      },
      body: JSON.stringify({ reviewId }),
    })
      .then((res) => {
        if (res.status === 200) {
          newState.splice(index, 1);
          this.setState({
            myReviews: newState,
          });
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  modifyReview(index, review) {
    let newState = Object.assign([], this.state.myReviews);
    newState.splice(index, 1, review);
    this.setState({
      myReviews: newState,
    });
  }

  handleModalDeleteReviewShown(status) {
    this.setState({
      modalDeleteReviewShown: status,
    });
  }

  handelWillDeleteModal(status) {
    this.setState({
      willDeleteModal: status,
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
          <>
            {myReviews.length > 0 ? (
              <>
                <ScrollView style={styles.container}>
                  {myReviews.map((review, index) => (
                    <View style={styles.review} key={index}>
                      <View style={styles.buttons}>
                        <Button
                          small
                          transparent
                          style={styles.modifyDeleteButton}
                          onPress={() => {
                            this.props.navigation.navigate('ModifyReview', {
                              review,
                              token: this.props.token,
                              index,
                              modifyReview: this.modifyReview,
                            });
                          }}
                        >
                          <SimpleLineIcons name='pencil' size={23} />
                        </Button>
                        <Button
                          small
                          transparent
                          style={styles.modifyDeleteButton}
                          onPress={() => {
                            this.setState({ deleteIndex: index });
                            this.handelWillDeleteModal(true);
                          }}
                        >
                          <FontAwesome name='trash-o' size={23} />
                        </Button>
                      </View>
                      <Text
                        style={
                          review.centerName.length > 16
                            ? styles.centernameLong
                            : styles.centername
                        }
                        onPress={() => this.goToMarker(review.centerId)}
                      >
                        {review.centerName}
                      </Text>
                      <Text>진료일자 : {review.date}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={styles.rate}>
                          {this.drawStars(review.rate)}
                        </View>
                      </View>
                      <View style={styles.specialtyContainer}>
                        {review.specialties.map((specialty) => (
                          <Text key={specialty} style={styles.specialty}>
                            #{specialty}
                          </Text>
                        ))}
                      </View>
                      <Text numberOfLines={3} style={styles.content}>
                        {review.content}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
                <DeleteReviewModal
                  handleModalDeleteReviewShown={
                    this.handleModalDeleteReviewShown
                  }
                  modalDeleteReviewShown={this.state.modalDeleteReviewShown}
                />
                <Modal
                  animationType='none'
                  transparent={true}
                  visible={this.state.willDeleteModal}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>
                        리뷰를 삭제하면 해당 예약건에 대해 리뷰를 쓰실 수
                        없습니다.
                      </Text>
                      <Text style={styles.confirmText}>
                        리뷰를 정말 삭제하시겠습니까?
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableHighlight
                          style={styles.closeButton}
                          onPress={() => {
                            this.handleModalDeleteReviewShown(true);
                            this.deleteReview(this.state.deleteIndex);
                            this.handelWillDeleteModal(false);
                          }}
                        >
                          <Text style={styles.textStyle}>삭제</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                          style={styles.closeButton}
                          onPress={() => {
                            this.handelWillDeleteModal(false);
                          }}
                        >
                          <Text style={styles.textStyle}>취소</Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                  </View>
                </Modal>
              </>
            ) : (
              <Text style={styles.noReview}>작성한 리뷰가 없습니다</Text>
            )}
          </>
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
    paddingTop: 15,
    backgroundColor: '#f7f7f7',
    flex: 1,
    width: '100%',
  },
  review: {
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 15,
    left: '2%',
    width: '96%',
    marginBottom: 15,
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
    marginLeft: 5,
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
    marginBottom: 2,
    fontSize: 18,
    fontWeight: 'bold',
  },
  centernameLong: {
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
    marginBottom: 2,
    fontSize: 17,
    letterSpacing: -2,
    fontWeight: 'bold',
  },
  rate: {
    marginTop: 5,
    flexDirection: 'row',
  },
  specialtyContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 5,
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
  noReview: {
    top: '45%',
    alignSelf: 'center',
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    top: '33%',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 35,
    paddingHorizontal: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    marginHorizontal: '10%',
    backgroundColor: '#62CCAD',
    borderRadius: 2,
    paddingHorizontal: 13,
    paddingVertical: 5,
    elevation: 2,
  },
  modalText: {
    marginHorizontal: '8%',
    fontSize: 17,
    marginBottom: 5,
    textAlign: 'center',
  },
  confirmText: {
    marginHorizontal: '8%',
    fontSize: 17,
    marginBottom: 20,
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MyReviews;
