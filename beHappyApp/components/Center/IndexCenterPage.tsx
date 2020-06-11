import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CenterPage from './CenterPage';
import BookingDetail from './BookingDetail';
import { View, Text } from 'native-base';

const stackNav = createStackNavigator({
  'CenterPage': {
    screen: CenterPage,
    navigationOptions: { headerShown: false }
  },
  'BookingDetail': {
    screen: BookingDetail,
    navigationOptions: {
      headerTitle: () =>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="access-time" size={24} style={{ color: 'white', paddingRight: 10, }} />
          <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold', }}>예약정보</Text>
        </View>,
      headerStyle: {
        backgroundColor: '#62CCAD',
      },
      headerTintColor: 'white',
    }
  },
}, {
  initialRouteName: 'CenterPage'
})

const NavContainer = createAppContainer(stackNav)

export default class IndexCenterPage extends React.Component {
  render() {
    return (
      <NavContainer />
    )
  }
}
