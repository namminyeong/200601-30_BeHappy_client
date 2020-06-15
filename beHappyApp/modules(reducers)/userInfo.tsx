const BOOKMARKID = 'handleUserInfo_BOOKMARKID';
const BOOKMARK = 'handleUserInfo_BOOKMARK';

export const controlBookmarkId = (bookmarkIdObj) => {
  return { type: BOOKMARKID, bookmarkIdObj };
};

export const controlBookmark = (bookmarkArr) => {
  return { type: BOOKMARK, bookmarkArr };
};

const initialState = {
  bookmarkId: {}, //북마크 되어있는 센터 아이디만 모음 {3:true, 6:true }
  bookmark: [], //북마크 되어있는 센터 정보 모두 모음 {[id, latitude...],[],[]}
};

function handleUserInfo(state = initialState, action) {
  switch (action.type) {
    case BOOKMARKID:
      return Object.assign({}, state, {
        bookmarkId: action.bookmarkIdObj,
      });
    case BOOKMARK:
      return Object.assign({}, state, {
        bookmark: action.bookmarkArr,
      });
    default:
      return state;
  }
}

export default handleUserInfo;
