import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { Button } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      specialties: this.props.specialties,
      centerTags: this.props.centerTags,
      modalShown: false,
    };

    this.changeSpecialtiesFilter = this.changeSpecialtiesFilter.bind(this);
    this.changeCenterFilter = this.changeCenterFilter.bind(this);
    this.completedModify = this.completedModify.bind(this);
    this.handleModalShows = this.handleModalShows.bind(this);
  }

  changeSpecialtiesFilter(specialty) {
    let newState = Object.assign({}, this.state.specialties);
    newState[specialty] = !newState[specialty];
    this.setState({
      specialties: newState,
    });
  }

  changeCenterFilter(center) {
    let newState = Object.assign({}, this.state.centerTags);
    newState[center] = !newState[center];
    this.setState({
      centerTags: newState,
    });
  }

  completedModify() {
    const { specialties, centerTags } = this.state;
    if (
      Object.values(specialties).indexOf(true) === -1 ||
      Object.values(centerTags).indexOf(true) === -1
    ) {
      this.handleModalShows(true);
    } else {
      this.props.controlSpecialties(this.state.specialties);
      this.props.controlCenterTags(this.state.centerTags);
      this.props.controlShowDetail(false, null);
      this.props.navigation.navigate('MapContainer');
    }
  }

  handleModalShows(status) {
    this.setState({
      modalShown: status,
    });
  }

  render() {
    const { specialties, centerTags } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>관심분야</Text>

        <View style={styles.specialties}>
          {Object.keys(specialties).map((specialty) => (
            <Button
              key={specialty}
              transparent
              onPress={() => this.changeSpecialtiesFilter(specialty)}
            >
              <Text
                style={
                  specialties[specialty] ? styles.selected : styles.notSelected
                }
              >
                #{specialty}
              </Text>
            </Button>
          ))}
        </View>
        <Text style={styles.title}>선호센터</Text>

        <View style={{ flexDirection: 'row' }}>
          {Object.keys(centerTags).map((center) => (
            <Button
              key={center}
              transparent
              onPress={() => this.changeCenterFilter(center)}
            >
              <Text
                style={
                  centerTags[center] ? styles.selected : styles.notSelected
                }
              >
                {center === 'psychiatric' ? '정신과' : '심리상담소'}
              </Text>
            </Button>
          ))}
        </View>

        <View style={{ alignItems: 'center' }}>
          <Button
            small
            transparent
            style={styles.completeButton}
            onPress={this.completedModify}
          >
            <Entypo name='check' size={23} />
            <Text style={styles.completeText}>완료</Text>
          </Button>
        </View>

        <Modal
          animationType='none'
          transparent={true}
          visible={this.state.modalShown}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                필터를 각각 1개 이상씩 선택해주세요
              </Text>

              <TouchableHighlight
                style={styles.closeButton}
                onPress={() => {
                  this.handleModalShows(false);
                }}
              >
                <Text style={styles.textStyle}>닫기</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 10,
  },
  specialties: { flexDirection: 'row', flexWrap: 'wrap' },
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
  completeButton: {
    borderRadius: 20,
    paddingHorizontal: 17,
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 30,
    width: 90,
    height: 35,
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
    fontSize: 18,
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
    backgroundColor: '#62CCAD',
    borderRadius: 2,
    paddingHorizontal: 13,
    paddingVertical: 5,
    elevation: 2,
  },
  modalText: {
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

export default Filter;
