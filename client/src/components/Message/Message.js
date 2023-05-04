import { useState, useEffect, Fragment } from "react";
import "./style.css";
import { calculateTime } from "../../utils/calculateTime";

const Message = ({ info, isMine }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [time, setTime] = useState("");
    const nameOfTheClass = isMine ? "mine" : "theirs";

    useEffect(() => {
        fetch(`http://localhost:3030/${info.username}`).then(res => res.json()).then(data => setUserInfo(data));
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