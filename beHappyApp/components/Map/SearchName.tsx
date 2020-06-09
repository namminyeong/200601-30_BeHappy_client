import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Header, Button, Icon, Item, Input, Container } from 'native-base';

class SearchName extends React.Component {
  state = {
    keyword: '',
  };

  //   componentDidMount() {
  //     fetch('http://13.209.16.103:4000/user/signin', {
  //         method: 'POST',
  //         credentials: 'include',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ username, password }),
  //       })
  //         .then((response) => {
  //           return response.json();
  //         })
  //         .then((payload) => {
  //           if (payload.errorCode) {
  //             if (payload.errorCode === 1) {
  //               alert('아이디를 확인해주세요.')
  //             }
  //             if (payload.errorCode === 2) {
  //               alert('비밀번호를 확인해주세요.')
  //             }
  //           } else {
  //             deviceStorage.saveKey('id_token', payload.token);
  //             this.props.controlLogin(this.props.status);
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //   }

  render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <Container style={styles.container}>
          <Header searchBar rounded style={{ backgroundColor: 'white' }}>
            <Item style={{ width: '80%' }}>
              <Icon active name='search' />
              <Input placeholder='검색어를 입력해주세요' />
              <Button
                transparent
                onPress={() => {
                  alert('search');
                }}
              >
                <Text>Search</Text>
              </Button>
            </Item>
          </Header>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
});

export default SearchName;
