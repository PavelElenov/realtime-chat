import { useState, useEffect, Fragment, useContext } from "react";
import "./style.css";
import { calculateTime } from "../../utils/calculateTime";
import { UserContext } from "../../contexts/UserContext";

const Message = ({ info, isMine, otherUserInfo}) => {
    const [userInfo, setUserInfo] = useState(null);
    const [time, setTime] = useState("");
    const {user} = useContext(UserContext);
    const nameOfTheClass = isMine ? "mine" : "theirs";

    useEffect(() => {
        otherUserInfo ? setUserInfo(otherUserInfo) : setUserInfo(user);
        setTime(calculateTime(info.time));
    }, []);

    return (
        <Fragment>
            {userInfo &&
                <div className={nameOfTheClass}>
                    <div className="user-img">
                        <img src={userInfo.img} />
                    </div>
                    <div>
                        <div className="message">
                            <p><strong>{userInfo.username}</strong></p>
                            <p>{info.message}</p>
                        </div>
                        <p className="time">{time}</p>
                    </div>
                </div>
            }
        </Fragment>
    );
};

export default Message;