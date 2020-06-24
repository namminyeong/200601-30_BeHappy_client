import React from 'react';
import { connect } from 'react-redux';
import Mypage from '../components/Mypage/Mypage';

const MypageContainer = ({ username, phone, navigation, token }) => {
  return (
    <Mypage
      username={username}
      phone={phone}
      navigation={navigation}
      token={token}
    />
  );
};

const mapStateToProps = (state) => ({
  username: state.handleUserInfo.username,
  phone: state.handleUserInfo.phone,
  token: state.handleLogin.token,
});

export default connect(mapStateToProps)(MypageContainer);
