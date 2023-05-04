import "./style.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { calculateTime } from "../../utils/calculateTime";
// 
const ChatList = ({ userInfo, getChat, chats }) => {
    const { user } = useContext(UserContext);
    const [chatInfo, setChatInfo] = useState(null)

    useEffect(() => {
        const chat = chats.filter(c => c.people.includes(userInfo.username) && c.people.includes(user.username))[0];

        if (chat) {
            const messageInfo = chat.messages.filter(m => m.username != userInfo.username).sort((m1, m2) => m2.time - m1.time)[0];
            const time = calculateTime(messageInfo.time);
            setChatInfo({message: messageInfo.message, time})
        }
    }, [])

    return (
        <div className="user-chat" onClick={() => getChat(userInfo.username, user.username)}>
            <div className="imgContainer">
                <img src={userInfo.img} />
            </div>
            <div className="info">
                <p><strong>{userInfo.username}</strong></p>
                {chatInfo &&
                    <div>
                        <p className="lastMessage">{chatInfo.message}</p>
                        <p className="time">{chatInfo.time}</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default ChatList;