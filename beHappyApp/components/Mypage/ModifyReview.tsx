import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { Button } from 'native-base';
import { AirbnbRating } from 'react-native-ratings';
import { Specialties } from '../../Data/Preference';
import Entypo from 'react-native-vector-icons/Entypo';

class ModifyReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyingReview: this.props.route.params.review,
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.completedModify = this.completedModify.bind(this);
    this.ratingCompleted = this.ratingCompleted.bind(this);
    this.checkSpecialties = this.checkSpecialties.bind(this);
    this.handleSpecialties = this.handleSpecialties.bind(this);
  }

  onChangeText(text) {
    let newState = Object.assign({}, this.state.modifyingReview);
    newState.content = text;
    this.setState({
      modifyingReview: newState,
    });
  }

  ratingCompleted(rate) {
    let newState = Object.assign({}, this.state.modifyingReview);
    newState.rate = rate;
    this.setState({
      modifyingReview: newState,
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
    let newState = Object.assign({}, this.state.modifyingReview);
    let index = newState.specialties.indexOf(specialty);
    if (index === -1) {
      newState.specialties.push(specialty);
    } else {
      newState.specialties.splice(index, 1);
    }
    this.setState({
      modifyingReview: newState,
    });
  }

  completedModify() {
    console.log('completedModify');
  }

  render() {
    const { modifyingReview } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.review}>
            <Text>진료일자 : {modifyingReview.date}</Text>
            <Text style={styles.centername}>{modifyingReview.centerName}</Text>

            <AirbnbRating
              showRating={false}
              size={40}
              selectedColor='#D61A3C'
              startingValue={modifyingReview.rate}
              fractions={1}
              defaultRating={modifyingReview.rate}
              onFinishRating={(rating) => this.ratingCompleted(rating)}
            />

            <View style={styles.SpecialtiesContainer}>
              {Specialties.map((specialtyArr) => {
                const [specialty] = specialtyArr;
                let color = this.checkSpecialties(
                  modifyingReview.specialties,
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
            </View>

            <TextInput
              multiline={true}
              defaultValue={modifyingReview.content}
              style={styles.content}
              onChangeText={(text) => {
                this.onChangeText(text);
              }}
            />

            <View style={{ alignItems: 'center' }}>
              <Button
                small
                transparent
                style={styles.completeButton}
                onPress={this.completedModify}
              >
                <Entypo name='check' size={27} />
                <Text style={styles.completeText}>완료</Text>
              </Button>
            </View>
          </View>
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
});

export default ModifyReview;
