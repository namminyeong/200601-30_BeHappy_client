import React from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { controlLogin } from '../modules(reducers)/auth';
import Mypage from '../components/Mypage/Mypage';

const MypageContainer = ({ username, phone, navigation }) => {
  return <Mypage username={username} phone={phone} navigation={navigation} />;
};

const mapStateToProps = (state) => ({
  username: state.handleUserInfo.username,
  phone: state.handleUserInfo.phone,
});

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       controlLogin,
//     },
//     dispatch
//   );
// };

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(MypageContainer);
