import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Header, Button, Icon, Item, Input, Container } from 'native-base';

class Search extends React.Component {
  //   state = {
  //   };

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

export default Search;
