import React from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';

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
    <SafeAreaView style={styles.container}>
      {bookmark.length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={bookmark}
          renderItem={({ item }) => (
            <BookMarkList
              bookmark={item}
              deleteBookmark={deleteBookmark}
              navigation={navigation}
              controlCenterData={controlCenterData}
              controlBookmarkClicked={controlBookmarkClicked}
              controlCoordinate={controlCoordinate}
            />
          )}
        />
      ) : (
        <Text style={styles.text}>즐겨찾기 목록이 없습니다.</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
  },
});
