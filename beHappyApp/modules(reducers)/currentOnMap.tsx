const COORDINATE = 'handleCurrentOnMap_COORDINATE';
const CENTERDATA = 'handleCurrentOnMap_CENTERDATA';

export const controlCoordinate = (lon, lat) => {
  return { type: COORDINATE, lon, lat };
};

export const controlCenterData = (counseling, psychiatric) => {
  return { type: CENTERDATA, counseling, psychiatric };
};

const initialState = {
  coordinate: [0, 0],
  counseling: [],
  psychiatric: [],
};

function handleCurrentOnMap(state = initialState, action) {
  switch (action.type) {
    case COORDINATE:
      return Object.assign({}, state, {
        coordinate: [action.lon, action.lat],
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
