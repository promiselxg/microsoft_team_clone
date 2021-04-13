import { auth } from "../firebase";
// Login
export const login = () => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });
    // connect to google auth
    auth.onAuthStateChanged((authUser) => {
      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: {
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        },
      });
    });
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: error,
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  // google auth signout
  auth.signOut();
  dispatch({ type: "USER_LOGOUT" });
  dispatch({
    type: "USER_LOGIN_REQUEST",
  });
};
