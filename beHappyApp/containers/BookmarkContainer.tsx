import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { controlBookmark } from '../modules(reducers)/userInfo';
import {
  controlCenterData,
  controlBookmarkClicked,
  controlCoordinate,
} from '../modules(reducers)/currentOnMap';
import Mybookmarks from '../components/Mypage/MyBookmarks';

const BookMarkContainer = ({
  navigation,
  token,
  controlBookmark,
  bookmark,
  controlCenterData,
  controlBookmarkClicked,
  controlCoordinate,
}) => {
  return (
    <Mybookmarks
      navigation={navigation}
      token={token}
      controlBookmark={controlBookmark}
      bookmark={bookmark}
      controlCenterData={controlCenterData}
      controlBookmarkClicked={controlBookmarkClicked}
      controlCoordinate={controlCoordinate}
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
      controlCenterData,
      controlBookmarkClicked,
      controlCoordinate,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookMarkContainer);
