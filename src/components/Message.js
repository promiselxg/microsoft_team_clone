import React from "react";
import "../styles/Message.css";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";

const Message = ({ id, user, message, email, photo }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <>
      <div
        className={`chat__message ${
          email === userInfo?.email && "chat__reciever"
        }`}
        id={id}
      >
        {email !== userInfo?.email && (
          <span className="chat__image">
            <Avatar src={photo}></Avatar>
          </span>
        )}
        <div className="chats">
          <span className="chat__name">{user}</span>
          <span className="chat__timestamp">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
          <div className="messages">
            <p>{message.message}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
