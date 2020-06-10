import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CenterPage from './CenterPage';
import BookingDetail from './BookingDetail';

const stackNav = createStackNavigator({
  'CenterPage': {
    screen: CenterPage,
    navigationOptions: { headerShown: false }
  },
  'BookingDetail': {
    screen: BookingDetail,
    navigationOptions: { headerShown: true }
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
