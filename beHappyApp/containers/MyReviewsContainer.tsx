import React from 'react';
import { connect } from 'react-redux';

import MyReviews from '../components/Mypage/MyReviews';

const MyReviewsContainer = ({ token, navigation }) => {
  return <MyReviews token={token} navigation={navigation} />;
};

const mapStateToProps = (state) => ({
  token: state.handleLogin.token,
});
export default connect(mapStateToProps)(MyReviewsContainer);
