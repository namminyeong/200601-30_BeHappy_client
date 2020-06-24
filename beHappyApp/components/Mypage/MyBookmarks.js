import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

import BookMarkList from './BookmarkList';
import getEnvVars from '../../environment';
const { ec2 } = getEnvVars();

export default function MyBookmarks({
  navigation,
  token,
  bookmark,
  controlBookmark,
  controlCenterData,
  controlBookmarkClicked,
  controlCoordinate,
}) {
  const deleteBookmark = (centerId) => {
    fetch(ec2 + '/bookmark', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ centerId }),
    })
      .then((res) => {
        if (res.status === 200) {
          deleteBookmarkState(centerId);
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const checkBookmark = (id) => {
    let exist = false;
    let index;
    bookmark.forEach((ele, i) => {
      if (ele.id === id) {
        exist = true;
        index = i;
      }
    });
    return [exist, index];
  };

  const deleteBookmarkState = (centerId) => {
    let newBookmarkState = Object.assign([], bookmark);
    let index = checkBookmark(centerId)[1];
    newBookmarkState.splice(index, 1);
    controlBookmark(newBookmarkState);
  };

  return (
    <View style={styles.container}>
      {bookmark.length > 0 ? (
        <ScrollView>
          {bookmark.map((eachBookmark, index) => (
            <BookMarkList
              key={index}
              bookmark={eachBookmark}
              deleteBookmark={deleteBookmark}
              navigation={navigation}
              controlCenterData={controlCenterData}
              controlBookmarkClicked={controlBookmarkClicked}
              controlCoordinate={controlCoordinate}
            />
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noBookmark}>즐겨찾기 목록이 없습니다</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    backgroundColor: 'white',
    flex: 1,
  },
  noBookmark: {
    top: '45%',
    alignSelf: 'center',
    fontSize: 20,
  },
});
