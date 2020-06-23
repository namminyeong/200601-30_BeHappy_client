import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { Button } from 'native-base';
import { AirbnbRating } from 'react-native-ratings';
import { Specialties } from '../../../Data/Preference';
import Entypo from 'react-native-vector-icons/Entypo';

import getEnvVars from '../../../environment';
import WriteReviewModal from './WriteReviewModal';
const { ec2 } = getEnvVars();

class BookingReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: this.props.route.params.token,
      centerId: this.props.route.params.booking.center.id,
      bookingId: this.props.route.params.booking.id,
      rate: 0,
      content: '',
      specialties: [],
      bookingInfo: this.props.route.params.booking,
      writeReviewModal: false,
    };

    this.submitReview = this.submitReview.bind(this);
    this.checkSpecialties = this.checkSpecialties.bind(this);
    this.handleSpecialties = this.handleSpecialties.bind(this);
    this.handleWriteReviewModal = this.handleWriteReviewModal.bind(this);
  }

  submitReview() {
    const { centerId, bookingId, rate, content, specialties } = this.state;

    fetch(ec2 + '/review', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({ centerId, bookingId, rate, content, specialties }),
    })
      .then((res) => {
        if (res.status === 200) {
          this.handleWriteReviewModal(true);
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  checkSpecialties(centerSpecialties, filterSpecialties) {
    let result = false;

    centerSpecialties.forEach((specialty) => {
      if (filterSpecialties === specialty) {
        result = true;
      }
    });

    return result;
  }

  handleSpecialties(specialty) {
    let newState = this.state.specialties;
    let index = newState.indexOf(specialty);

    if (index === -1) {
      newState.push(specialty);
    } else {
      newState.splice(index, 1);
    }

    this.setState({
      specialties: newState,
    });
  }

  handleWriteReviewModal(status) {
    this.setState({
      writeReviewModal: status,
    });
  }

  render() {
    const { bookingInfo, specialties } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.review}>
            <Text>진료일자 : {bookingInfo.date}</Text>
            <Text style={styles.centername}>
              {bookingInfo.center.centerName}
            </Text>
            <AirbnbRating
              showRating={false}
              size={40}
              selectedColor='#D61A3C'
              fractions={1}
              defaultRating={0}
              onFinishRating={(rating) => {
                this.setState({
                  rate: rating,
                });
              }}
            />
            <View style={styles.SpecialtiesContainer}>
              {Specialties.map((specialty) => {
                let color = this.checkSpecialties(specialties, specialty)
                  ? '#62CCAD'
                  : '#D1D1D1';
                return (
                  <Button
                    key={specialty}
                    transparent
                    onPress={() => this.handleSpecialties(specialty)}
                  >
                    <Text
                      style={[styles.specialties, { backgroundColor: color }]}
                    >
                      #{specialty}
                    </Text>
                  </Button>
                );
              })}
            </View>
            <TextInput
              multiline={true}
              style={styles.content}
              onChangeText={(text) => {
                this.setState({
                  content: text,
                });
              }}
            />
            <View style={{ alignItems: 'center' }}>
              <Button
                small
                transparent
                style={styles.completeButton}
                onPress={this.submitReview}
              >
                <Entypo name='check' size={27} />
                <Text style={styles.completeText}>완료</Text>
              </Button>
            </View>
          </View>
          <WriteReviewModal
            navigation={this.props.navigation}
            writeReviewModal={this.state.writeReviewModal}
            handleWriteReviewModal={this.handleWriteReviewModal}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  review: {
    padding: 10,
    paddingTop: 15,
    left: '2%',
    width: '94%',
    marginTop: 15,
  },
  centername: {
    marginTop: 6,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  SpecialtiesContainer: {
    flexDirection: 'row',
    marginTop: 15,
    flexWrap: 'wrap',
  },
  specialties: {
    marginVertical: 7,
    color: 'white',
    marginRight: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 13,
    fontSize: 17,
  },
  content: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginTop: 17,
    marginBottom: 10,
    fontSize: 17,
    lineHeight: 30,
  },
  completeButton: {
    borderRadius: 20,
    paddingHorizontal: 17,
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 15,
    width: 100,
    height: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: 'white',
  },
  completeText: {
    fontSize: 20,
  },
  selected: {
    backgroundColor: '#62ccad',
    marginTop: -2,
    borderRadius: 12,
    padding: 3,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  notSelected: {
    backgroundColor: '#D1D1D1',
    marginTop: -2,
    borderRadius: 12,
    padding: 3,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BookingReview;
