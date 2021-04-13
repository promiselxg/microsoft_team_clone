export const appReducer = (
  state = { channelId: null, channelName: null },
  action
) => {
  switch (action.type) {
    case "CHANNEL_REQUEST":
      return { loading: true, channelId: [], channelName: [] };
    case "CHANNEL_SUCCESS":
      return { loading: false, user: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
