import React, { useState } from "react";
import "../styles/Chat.css";
import ChatHeader from "./ChatHeader";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import GifOutlinedIcon from "@material-ui/icons/GifOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import FingerprintOutlinedIcon from "@material-ui/icons/FingerprintOutlined";
import PriorityHighOutlinedIcon from "@material-ui/icons/PriorityHighOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useParams } from "react-router";
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../firebase";
import { useSelector } from "react-redux";
import firebase from "firebase";
import Message from "./Message";
import StartChat from "./StartChat";
import { Circle } from "better-react-spinkit";

const Chat = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [input, setInput] = useState("");
  const { id } = useParams();

  // pull message from DB on real time
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const sendMessage = (e) => {
    e.preventDefault();
    // update Lastseen
    db.collection("users").doc(userInfo?.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    // add a message to collection based on user ID
    db.collection("chats").doc(id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: userInfo.displayName,
      userEmail: userInfo.email,
      photoURL: userInfo.photo,
    });

    setInput("");
  };

  // get chat message
  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          id={message.id}
          user={message.data().displayName}
          email={message.data().userEmail}
          photo={message.data().photoURL}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    }
  };
  return (
    <div className="chat">
      <div className="chat__box1">
        <ChatHeader />
      </div>

      <div className="chat__box2">
        <div className="chat__messages">
          {!messagesSnapshot && <Circle size={50} color="whitesmoke" />}
          {!id ? <StartChat /> : showMessages()}
        </div>
      </div>

      <div className="chat__box3">
        <div className="chat__input">
          <form>
            <input
              type="text"
              placeholder="Type a new message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button disabled={!input} type="submit" onClick={sendMessage}>
              chat
            </button>
          </form>
        </div>
        <div className="chat__input__icons">
          <div>
            <CreateOutlinedIcon />
            <PriorityHighOutlinedIcon />
            <AttachFileOutlinedIcon />
            <SentimentSatisfiedOutlinedIcon />
            <GifOutlinedIcon />
            <RefreshOutlinedIcon />
            <ExpandMoreOutlinedIcon />
            <FilterListOutlinedIcon />
            <FingerprintOutlinedIcon />
            <MoreHorizIcon />
          </div>
          <div>
            <SendOutlinedIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
