import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { Button } from 'native-base';
import { AirbnbRating } from 'react-native-ratings';
import { Specialties } from '../../../Data/Preference';
import Entypo from 'react-native-vector-icons/Entypo';
import getEnvVars from '../../../environment';
const { ec2 } = getEnvVars();

class BookingReview extends React.Component {
  constructor(props) {
    super(props);
    console.log('BookingReview 진입');
    console.log('props: ', this.props);
    console.log('props: ', this.props.route.params);
    this.state = {
      token: this.props.route.params.token,
      centerId: this.props.route.params.booking.center.id,
      bookingId: this.props.route.params.booking.id,
      rate: 0,
      content: '',
      specialties: ['스트레스', '강박'],
      newReview: this.props.route.params.booking,
    };
    this.submitReview = this.submitReview.bind(this);
    // this.onChangeText = this.onChangeText.bind(this);
    // this.ratingCompleted = this.ratingCompleted.bind(this);
    // this.checkSpecialties = this.checkSpecialties.bind(this);
    // this.handleSpecialties = this.handleSpecialties.bind(this);
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
          return res.json();
        }
      })
      .then((payload) => {
        console.log('payload: ', payload);
        this.props.navigation.navigate('MyBookingContainer');
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  // onChangeText(text) {
  //   let newState = Object.assign({}, this.state.newReview);
  //   newState.content = text;
  //   this.setState({
  //     newReview: newState,
  //   });
  // }

  // ratingCompleted(rate) {
  //   let newState = Object.assign({}, this.state.newReview);
  //   newState.rate = rate;
  //   this.setState({
  //     newReview: newState,
  //   });
  // }

  // checkSpecialties(centerSpecialties, filterSpecialties) {
  //   let result = false;
  //   centerSpecialties.forEach((specialty) => {
  //     if (filterSpecialties === specialty) {
  //       result = true;
  //     }
  //   });
  //   return result;
  // }

  // handleSpecialties(specialty) {
  //   let newState = Object.assign({}, this.state.newReview);
  //   let index = newState.specialties.indexOf(specialty);
  //   if (index === -1) {
  //     newState.specialties.push(specialty);
  //   } else {
  //     newState.specialties.splice(index, 1);
  //   }
  //   this.setState({
  //     newReview: newState,
  //   });
  // }

  render() {
    const { newReview } = this.state;

    return (
      <View style={styles.container}>
        {/* <ScrollView> */}
        <View style={styles.review}>
          <Text>진료일자 : {newReview.date}</Text>
          <Text style={styles.centername}>{newReview.center.centerName}</Text>
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
          {/* <View style={styles.SpecialtiesContainer}>
          // this.ratingCompleted(rating)}
              {Specialties.map((specialtyArr) => {
                const [specialty] = specialtyArr;
                let color = this.checkSpecialties(
                  newReview.specialties,
                  specialty
                )
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
            </View> */}
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
        {/* </ScrollView> */}
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
});

export default BookingReview;
