const COORDINATE = 'handleSearchWithGeo_COORDINATE';
const CENTERDATA = 'handleSearchWithGeo_CENTERDATA';

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

function handleSearchWithGeo(state = initialState, action) {
  switch (action.type) {
    case COORDINATE:
      return {
        coordinate: [action.lon, action.lat],
      };
    case COORDINATE:
      return {
        counseling: action.counseling,
        psychiatric: action.psychiatric,
      };
    default:
      return state;
  }
}

export default handleSearchWithGeo;
