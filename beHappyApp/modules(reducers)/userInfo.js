const BOOKMARK = 'handleUserInfo_BOOKMARK';
const BASICUSERINFO = 'handleUserInfo_BASICUSERINFO';
const PREFERENCEUSERINFO = 'handleUserInfo_PREFERENCEUSERINFO';

export const controlBookmark = (bookmarkArr) => {
  return { type: BOOKMARK, bookmarkArr };
};

export const controlBasicUserInfo = (username, phone) => {
  return { type: BASICUSERINFO, username, phone };
};

export const controlPreferenceUserInfo = (specialties, city, states, kindOfCenters) => {
  return { type: PREFERENCEUSERINFO, specialties, city, states, kindOfCenters };
};

const initialState = {
  bookmark: [],
  username: '',
  phone: '',
  city: '',
  states: '',
  specialties: [],
  kindOfCenters: [],
};

function handleUserInfo(state = initialState, action) {
  switch (action.type) {
    case BOOKMARK:
      return Object.assign({}, state, {
        bookmark: action.bookmarkArr,
      });
    case BASICUSERINFO:
      return Object.assign({}, state, {
        username: action.username,
        phone: action.phone,
      });
    case PREFERENCEUSERINFO:
      return Object.assign({}, state, {
        specialties: action.specialties,
        city: action.city,
        states: action.states,
        kindOfCenters: action.kindOfCenters,
      });

    default:
      return state;
  }
}

export default handleUserInfo;
