import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
} from 'react-native';

class SpecialtyPreference extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      centerId: this.props.route.params.centerId,
      specialties: [],
      specialtyData: [
        '불면증',
        '우울증',
        '불안',
        '가족',
        '부부',
        '아동·청소년',
        '공황',
        '중독',
        '자해·자살',
      ],
      showAlertModal: false,
      showAlertModalText: '',
    };

    this.submitPreference = this.submitPreference.bind(this);
    this.handleSpecialty = this.handleSpecialty.bind(this);
  }

  submitPreference() {
    const { centerId, specialties } = this.state;

    fetch('http://13.209.16.103:4000/preference/center', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ centerId, specialties }),
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            showAlertModal: true,
            showAlertModalText: '제출에 성공했습니다.',
          });
        }
      })
      .catch((error) => {
        this.setState({
          showAlertModal: true,
          showAlertModalText: '제출에 실패했습니다.',
        });
      });
  }

  handleSpecialty(value) {
    const { specialties } = this.state;
    if (specialties.indexOf(value) === -1) {
      this.setState({
        specialties: [...specialties, value],
      });
    } else {
      this.setState({
        specialties: specialties.filter((specialty) => specialty !== value),
      });
    }
  }

  render() {
    const { specialties, specialtyData } = this.state;

    return (
      <View style={styles.container}>
        <Text style={{ marginTop: '5%' }}>
          * 아래의 내용을 바탕으로 상담소를 사용자의 관심사에 따라 추천하는
          순서대로 빨간색-주황색-노란색으로 표시합니다.
        </Text>
        <View style={styles.preference}>
          <Text style={styles.section}>Preference</Text>
          <Text style={styles.preSection}>전문 분야</Text>
          <View style={styles.attention}>
            {specialtyData.map((data, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => this.handleSpecialty(data)}
              >
                <Text
                  style={
                    specialties.indexOf(data) === -1
                      ? styles.notSelected
                      : styles.selected
                  }
                >
                  #{data}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={{
              paddingBottom: 20,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('LoginContainer');
              }}
            >
              <Text style={styles.submitBtn}>스킵</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.submitPreference}>
              <Text style={styles.submitBtn}>완료</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType='none'
          transparent={true}
          visible={this.state.showAlertModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {this.state.showAlertModalText}
              </Text>

              <TouchableHighlight
                style={styles.closeButton}
                onPress={() => {
                  this.setState({
                    showAlertModal: false,
                    showAlertModalText: '',
                  });
                  this.props.navigation.navigate('LoginContainer');
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

const styles = {
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: '6%',
    paddingVertical: '12%',
  },
  section: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  preference: {
    marginTop: '4%',
  },
  preSection: {
    marginVertical: '3%',
    paddingLeft: 6,
    fontSize: 18,
  },
  attention: {
    marginLeft: '2%',
    marginRight: '2%',
    paddingBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  hashtagButton: {
    marginTop: 9,
    marginRight: 10,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#62CCAD',
    borderRadius: 20,
  },
  selected: {
    fontSize: 17,
    color: 'white',
    marginTop: 9,
    marginRight: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: '#62CCADc',
    borderRadius: 20,
  },
  notSelected: {
    fontSize: 17,
    color: 'white',
    marginTop: 9,
    marginRight: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: '#D1D1D1',
    borderRadius: 20,
  },
  submitBtn: {
    backgroundColor: 'white',
    borderWidth: 1,
    fontSize: 18,
    marginTop: '40%',
    marginRight: 10,
    padding: 3,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
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
};

export default SpecialtyPreference;
