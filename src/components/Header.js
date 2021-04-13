import React, { useState } from "react";
import AppsIcon from "@material-ui/icons/Apps";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
import "../styles/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/UserActions";
import * as EmailValidator from "email-validator";
import db from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

const Header = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", userInfo?.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  // check if recipient email already exist
  const chatAlredyExist = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  // create chat
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      if (
        EmailValidator.validate(input) &&
        !chatAlredyExist(input) &&
        input !== userInfo?.email
      ) {
        db.collection("chats").add({
          users: [userInfo?.email, input],
        });
      }
      setInput("");
    }
  };

  return (
    <div className="header">
      <div className="header__sideBar">
        <div className="header__sideBar__left">
          <AppsIcon />
        </div>
        <div className="header__sideBar__right">
          <h1>Microsoft Teams</h1>
        </div>
      </div>
      <div className="header__right">
        <div className="header__rightSearch">
          <form>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <button type="submit" onClick={handleSubmit}>
              Chat
            </button>
          </form>
        </div>
      </div>
      <div className="header__user">
        <Avatar
          alt="login user"
          variant="circular"
          onClick={() => dispatch(logout())}
          src="https://media-exp1.licdn.com/dms/image/C5603AQFx5WEjMIgdhw/profile-displayphoto-shrink_200_200/0/1566554542158?e=1623283200&v=beta&t=3TVB7J-kkvG88ccEug47vSrlnPcd9rjh31CRy-W1fTs"
        >
          AO
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
