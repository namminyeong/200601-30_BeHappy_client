import React from 'react';
import { connect } from 'react-redux';

import DetailReviews from '../components/Map/details/DetailReviews';

const DetailReviewsContainer = ({ token, route }) => {
  return <DetailReviews token={token} theCenterInfo={route.params} />;
};

const mapStateToProps = (state) => ({
  token: state.handleLogin.token,
});

export default connect(mapStateToProps)(DetailReviewsContainer);
