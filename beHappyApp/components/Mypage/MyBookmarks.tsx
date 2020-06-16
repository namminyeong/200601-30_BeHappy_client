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
}) {
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
        return res.json();
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {bookmark.length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.toString()}
          data={bookmark}
          renderItem={({ item }) => (
            <BookMarkList
              bookmark={item}
              deleteBookmark={deleteBookmark}
              navigation={navigation}
            />
          )}
        />
      ) : (
        <Text>BookMark한 Center가 없습니다.</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    padding: 15,
  },
});
