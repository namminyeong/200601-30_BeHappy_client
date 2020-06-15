const BOOKMARK = 'handleUserInfo_BOOKMARK';

export const controlBookmark = (bookmarkObj) => {
  return { type: BOOKMARK, bookmarkObj };
};

const initialState = {
  bookmark: {},
};

function handleUserInfo(state = initialState, action) {
  switch (action.type) {
    case BOOKMARK:
      return Object.assign({}, state, {
        bookmark: action.bookmarkObj,
      });

    default:
      return state;
  }
}

export default handleUserInfo;
