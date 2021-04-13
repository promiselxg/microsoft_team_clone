import Avatar from "@material-ui/core/Avatar";
import Truncate from "react-truncate";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useSelector } from "react-redux";
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../firebase";
import { Link } from "react-router-dom";

const SidebarChats = ({ id, name, message, date }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(name, userInfo?.email))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(name, userInfo?.email);

  return (
    <>
      <Link to={`/chat/${id}`}>
        <div className="sidebar__main__chats">
          <div className="sidebar__chats__avatar">
            {recipient ? (
              <Avatar variant="circular" src={recipient?.photoURL} />
            ) : (
              <Avatar variant="circular">
                {recipientEmail[0].toUpperCase()}
              </Avatar>
            )}
          </div>
          <div className="sidebar__chats__user">
            <h1>{recipientEmail}</h1>
            <Truncate lines={1} ellipsis="..." className="trunacte">
              {message}
            </Truncate>
          </div>
          <div className="sidebar__chat__date">
            <p>{date}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SidebarChats;
