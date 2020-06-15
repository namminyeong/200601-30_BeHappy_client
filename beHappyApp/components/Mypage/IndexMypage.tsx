import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import BookMarkContainer from '../../containers/BookMarkContainer';
import Mypage from './Mypage';
import MyInfo from './MyInfo';
import MyReviews from './MyReviews';
import MyBookings from './MyBookings';
import BookmarkMap from '../Mypage/BookmarkMap';

const stackNav = createStackNavigator(
  {
    Mypage: {
      screen: Mypage,
      navigationOptions: { headerShown: false },
    },
    MyInfo: {
      screen: MyInfo,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#62CCAD',
        },
        headerTintColor: 'white',
      },
    },
    BookMarkContainer: {
      screen: BookMarkContainer,
      navigationOptions: { headerShown: false },
    },
    MyReviews: {
      screen: MyReviews,
    },
    MyBookings: {
      screen: MyBookings,
    },
    BookmarkMap: {
      screen: BookmarkMap,
      navigationOptions: { headerShown: false },
    },
  },
  {
    initialRouteName: 'Mypage',
  }
);

const NavContainer = createAppContainer(stackNav);

class IndexMypage extends React.Component {
  static navigationOptions = { header: null };
  render() {
    return <NavContainer />;
  }
}

export default IndexMypage;
