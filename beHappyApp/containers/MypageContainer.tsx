import React from 'react';
import { connect } from 'react-redux';
import Mypage from '../components/Mypage/Mypage';

const MypageContainer = ({ username, phone, navigation }) => {
  return <Mypage username={username} phone={phone} navigation={navigation} />;
};

const mapStateToProps = (state) => ({
  username: state.handleUserInfo.username,
  phone: state.handleUserInfo.phone,
});

export default connect(mapStateToProps)(MypageContainer);
