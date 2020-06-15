const BOOKMARK = 'handleUserInfo_BOOKMARK';

export const controlBookmark = (bookmarkArr) => {
  return { type: BOOKMARK, bookmarkArr };
};

const initialState = {
  bookmark: [], //북마크 되어있는 센터 정보 모두 모음 {[id, latitude...],[],[]}
};

function handleUserInfo(state = initialState, action) {
  switch (action.type) {
    case BOOKMARK:
      return Object.assign({}, state, {
        bookmark: action.bookmarkArr,
      });
    default:
      return state;
  }
}

export default handleUserInfo;
