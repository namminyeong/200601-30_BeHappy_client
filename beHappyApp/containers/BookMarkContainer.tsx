import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { controlBookmark } from '../modules(reducers)/userInfo';
import Mybookmark from '../components/Mypage/MyBookmarks';

const BookMarkContainer = ({
  navigation,
  token,
  controlBookmark,
  bookmark,
}) => {
  return (
    <Mybookmark
      navigation={navigation}
      token={token}
      controlBookmark={controlBookmark}
      bookmark={bookmark}
    />
  );
};

const mapStateToProps = (state) => ({
  token: state.handleLogin.token,
  bookmark: state.handleUserInfo.bookmark,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlBookmark,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookMarkContainer);
