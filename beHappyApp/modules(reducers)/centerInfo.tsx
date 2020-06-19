const CENTERINFO = 'handleCENTERINFO_LOGIN' as const;

export const controlCenterInfo = (info: object) => {
  return { type: CENTERINFO, info };
};

type CenterInfoAction = ReturnType<typeof controlCenterInfo>;

type CenterInfo = {
  id: number;
  latitude: number;
  longitude: number;
  centerName: string;
  addressName: string;
  roadAddressName: string;
  phone: string;
  rateAvg: number;
};

const initialState: CenterInfo = {};

function handleCenterInfo(
  state: CenterInfo = initialState,
  action: CenterInfoAction
) {
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
