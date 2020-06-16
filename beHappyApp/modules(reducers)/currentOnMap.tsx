const COORDINATE = 'handleCurrentOnMap_COORDINATE';
const CENTERDATA = 'handleCurrentOnMap_CENTERDATA';
const BOOKMARKCLICKED = 'handleCurrentOnMap_BOOKMARKCLICKED';

export const controlCoordinate = (
  lon,
  lat,
  lonDelta = 0.03,
  latDelta = 0.02
) => {
  return { type: COORDINATE, lon, lat, lonDelta, latDelta };
};

export const controlCenterData = (counseling, psychiatric) => {
  return { type: CENTERDATA, counseling, psychiatric };
};

export const controlBookmarkClicked = (status) => {
  return { type: BOOKMARKCLICKED, status };
};

const initialState = {
  coordinate: [0, 0, 0.03, 0.02],
  counseling: [],
  psychiatric: [],
  bookmarkClicked: false,
};

function handleCurrentOnMap(state = initialState, action) {
  switch (action.type) {
    case COORDINATE:
      return Object.assign({}, state, {
        coordinate: [
          parseFloat(action.lon),
          parseFloat(action.lat),
          parseFloat(action.lonDelta),
          parseFloat(action.latDelta),
        ],
      });
    case CENTERDATA:
      return Object.assign({}, state, {
        counseling: action.counseling,
        psychiatric: action.psychiatric,
      });
    case BOOKMARKCLICKED:
      return Object.assign({}, state, {
        bookmarkClicked: action.status,
      });

    default:
      return state;
  }
}

export default handleCurrentOnMap;
