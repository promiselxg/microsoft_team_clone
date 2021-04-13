import Avatar from "@material-ui/core/Avatar";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import AddIcon from "@material-ui/icons/Add";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const ChatHeader = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { id } = useParams();

  if (id) {
  }

  return (
    <>
      <div className="chat__header">
        <div className="chat__header__userInfo">
          <Avatar
            alt={userInfo.displayName}
            variant="circular"
            src={userInfo.photo}
          >
            AO
          </Avatar>
          <h1>{userInfo.displayName}</h1>
        </div>
        <div className="chat__header__links">
          <p>Chats</p>
          <p>Files</p>
          <p>Organization</p>
          <p>1 More</p>
          <ExpandMoreOutlinedIcon />
          <AddIcon />
        </div>
        <div className="chat__header__call">
          <div className="chat__header__call__border">
            <VideocamOutlinedIcon />
            <PhoneOutlinedIcon style={{ borderLeft: "none" }} />
          </div>
          <PeopleOutlineOutlinedIcon />
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
