const COORDINATE = 'handleCurrentOnMap_COORDINATE';
const CENTERDATA = 'handleCurrentOnMap_CENTERDATA';
const BOOKMARKCLICKED = 'handleCurrentOnMap_BOOKMARKCLICKED';
const SPECIALTIES = 'handleCurrentOnMap_SPECIALTIES';
const CENTERTAGS = 'handleCurrentOnMap_CENTERTAGS';
const SHOWDETAIL = 'handleCurrentOnMap_SHOWDETAIL';
const GEOMODALSHOWN = 'handleCurrentOnMap_GEOMODALSHOWN';

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

export const controlSpecialties = (specialties) => {
  return { type: SPECIALTIES, specialties };
};

export const controlCenterTags = (centerTags) => {
  return { type: CENTERTAGS, centerTags };
};

export const controlShowDetail = (status, index) => {
  return { type: SHOWDETAIL, status, index };
};

export const controlGeoModalShown = (status) => {
  return { type: GEOMODALSHOWN, status };
};

const initialState = {
  coordinate: [0, 0, 0.03, 0.02],
  counseling: [],
  psychiatric: [],
  bookmarkClicked: false,
  specialties: {
    불면증: true,
    우울증: true,
    불안: true,
    가족: true,
    부부: true,
    아동·청소년: true,
    공황: true,
    중독: true,
    자해·자살: true,
  },
  centerTags: { psychiatric: true, counseling: true },
  showDetailsIndex: null,
  showDetails: false,
  GeoModalShown: false,
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
    case SPECIALTIES:
      return Object.assign({}, state, {
        specialties: action.specialties,
      });
    case CENTERTAGS:
      return Object.assign({}, state, {
        centerTags: action.centerTags,
      });
    case SHOWDETAIL:
      return Object.assign({}, state, {
        showDetailsIndex: action.index,
        showDetails: action.status,
      });
    case GEOMODALSHOWN:
      return Object.assign({}, state, {
        GeoModalShown: action.status,
      });

    default:
      return state;
  }
}

export default handleCurrentOnMap;
