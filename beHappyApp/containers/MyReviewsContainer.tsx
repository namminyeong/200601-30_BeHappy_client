import React from 'react';
import { connect } from 'react-redux';

import MyReviews from '../components/Mypage/MyReviews';

const MyReviewsContainer = ({ token }) => {
  return <MyReviews token={token} />;
};

const mapStateToProps = (state) => ({
  token: state.handleLogin.token,
});
export default connect(mapStateToProps)(MyReviewsContainer);
