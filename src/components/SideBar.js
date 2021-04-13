import React, { useEffect, useState } from "react";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatIcon from "@material-ui/icons/Chat";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DialpadIcon from "@material-ui/icons/Dialpad";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import "../styles/Sidebar.css";
import Items from "./Items";
import SidebarChats from "./SidebarChats";
import Chat from "./Chat";
import db from "../firebase";

const SideBar = () => {
  const [userChat, setUserChat] = useState([]);

  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) =>
      setUserChat(
        snapshot.docs.map((chat) => ({
          id: chat.id,
          email: chat.data().users,
        }))
      )
    );
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__small">
        <Items Icon={<NotificationsNoneIcon />} Text="Activity" />
        <Items Icon={<ChatIcon />} Text="Chat" />
        <Items Icon={<PeopleOutlineOutlinedIcon />} Text="Teams" />
        <Items Icon={<DateRangeOutlinedIcon />} Text="Calender" />
        <Items Icon={<InsertDriveFileOutlinedIcon />} Text="Files" />
        <Items Icon={<MoreHorizIcon />} Text="" className="moreIcon" />
        <div className="spacer"></div>
        <Items Icon={<DialpadIcon />} Text="apps" />
        <Items Icon={<HelpOutlineIcon />} Text="help" />
      </div>
      <div className="sidebar__main">
        <div className="siebar__main__top">
          <div>
            <h1>Chat</h1>
            <ExpandMoreOutlinedIcon />
          </div>
          <div>
            <FilterListOutlinedIcon />
            <CreateOutlinedIcon />
          </div>
        </div>
        <div className="sidebar__main__top__recent">
          <ExpandMoreOutlinedIcon />
          <h1>Recent</h1>
        </div>
        {userChat.map(({ id, email }) => (
          <SidebarChats
            key={id}
            id={id}
            name={email}
            message="trust u had a wonderful night rest?"
            date="04/4"
          />
        ))}
      </div>
      <Chat />
    </div>
  );
};

export default SideBar;
