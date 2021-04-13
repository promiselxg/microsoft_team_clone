import React, { useEffect } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import { login } from "./actions/UserActions";
import db from "./firebase";
import firebase from "firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo?.uid) {
      db.collection("users").doc(userInfo?.uid).set(
        {
          email: userInfo.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: userInfo.photo,
        },
        { merge: true }
      );
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(login());
  }, [dispatch]);

  return (
    <div className="app">
      {userInfo ? (
        <Router>
          <Header />
          <Switch>
            <Route path="/chat/:id">
              <SideBar />
            </Route>
            <Route path="/" exact>
              <SideBar />
            </Route>
          </Switch>
        </Router>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
