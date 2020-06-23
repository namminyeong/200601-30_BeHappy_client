import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';

class TagFilters extends React.Component {
  render() {
    const { tag, index, selected } = this.props;
    return (
      <Button
        key={tag}
        transparent
        onPress={() => this.props.changeFilter(index)}
      >
        <Text style={selected ? styles.selected : styles.notSelected}>
          #{tag}
        </Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
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

export default TagFilters;
