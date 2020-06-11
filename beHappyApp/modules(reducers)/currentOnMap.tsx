const COORDINATE = 'handleCurrentOnMap_COORDINATE';
const CENTERDATA = 'handleCurrentOnMap_CENTERDATA';

export const controlCoordinate = (lon, lat, lonDelta, latDelta) => {
  return { type: COORDINATE, lon, lat, lonDelta, latDelta };
};

export const controlCenterData = (counseling, psychiatric) => {
  return { type: CENTERDATA, counseling, psychiatric };
};

const initialState = {
  coordinate: [0, 0, 0.03, 0.02],
  counseling: [],
  psychiatric: [],
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

    default:
      return state;
  }
}

export default handleCurrentOnMap;
