import React from 'react';
import { connect } from 'react-redux';

import DetailsHome from '../components/Map/details/DetailsHome';

const DetailHomeContainer = ({ bookmark, route }) => {
  let bookmarked = false;
  bookmark.forEach((obj) => {
    if (obj.id === route.params.theCenterInfo.id) {
      bookmarked = true;
      return;
    }
  });
  return (
    <DetailsHome
      bookmark={bookmarked}
      theCenterInfo={route.params.theCenterInfo}
      postDeletebookmark={route.params.postDeletebookmark}
    />
  );
};

const mapStateToProps = (state) => ({
  bookmark: state.handleUserInfo.bookmark,
});

export default connect(mapStateToProps)(DetailHomeContainer);
