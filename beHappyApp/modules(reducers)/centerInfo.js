const CENTERINFO = 'handleCENTERINFO_LOGIN';

export const controlCenterInfo = (info) => {
  return { type: CENTERINFO, info };
};

const initialState = {
  CenterInfo: {},
};

function handleCenterInfo(state = initialState, action) {
  switch (action.type) {
    case CENTERINFO:
      return Object.assign({}, state, {
        CenterInfo: action.info,
      });
    default:
      return state;
  }
}

export default handleCenterInfo;
