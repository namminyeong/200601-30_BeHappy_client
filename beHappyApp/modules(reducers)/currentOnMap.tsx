const COORDINATE = 'handleCurrentOnMap_COORDINATE';
const CENTERDATA = 'handleCurrentOnMap_CENTERDATA';

export const controlCoordinate = (lon, lat) => {
  return { type: COORDINATE, lon, lat };
};

export const controlCenterData = (counseling, psychiatric) => {
  return { type: CENTERDATA, counseling, psychiatric };
};

const initialState = {
  coordinate: [126, 37],
  counseling: [
    {
      id: 1,
      latitude: 37.505131,
      longitude: 127.055214,
      centerName: '허그맘허그인 강남본점',
      addressName: '서울 강남구 대치동 891-44',
      roadAddressName: '서울 강남구 테헤란로78길 16',
      phone: '02-568-6255',
      rateAvg: 0,
      distance: '1222',
    },
  ],
  psychiatric: [
    {
      id: 16,
      latitude: 37.514652,
      longitude: 127.060577,
      centerName: '소민정신건강의학과의원',
      addressName: '서울 강남구 삼성동 107',
      roadAddressName: '서울 강남구 영동대로 602',
      phone: '02-548-0868',
      rateAvg: 0,
      distance: '202',
    },
  ],
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
