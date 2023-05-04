import { useState, useEffect, useContext } from "react";
import "./style.css";
import ChatList from "../Chat/ChatList";
import Message from "../Message/Message";
import { UserContext } from "../../contexts/UserContext";

const ws = new WebSocket("ws://localhost:3030");

const Home = () => {
    const [users, setUsers] = useState(null);
    const [chats, setChats] = useState(null);
    const [receiver, setReceiver] = useState("");
    const [currentChat, setCurrentChat] = useState({people:[], messages:[]}); // [{people: ["By-the-way", "Kaside"], messages: [ {name: "By-the-way", message: "Hi, How are you?", time:1111},{name: "Kaside",message: "Hi, I am good thank you."}]}]
    const [newMessage, setNewMessage] = useState("");

    const { user } = useContext(UserContext);
    console.log(chats);
    useEffect(() => {
        fetch("http://localhost:3030/users").then(res => res.json()).then(data => setUsers(data.filter(u => u.username != user.username)));
        fetch("http://localhost:3030/chats").then(res => res.json()).then(data => setChats(data));

        
        ws.addEventListener("message", (d) => {
            const data = JSON.parse(d.data);
            
            if(user.username == data.receiver){
                setCurrentChat(state => ({people: state.people, messages: [...state.messages, {username:data.sender, message: data.message, time: data.time}]}))
            }
        });
    }, []);

    useEffect(() => {
        fetch("http://localhost:3030/chats").then(res => res.json()).then(data => setChats(data));
    }, [currentChat])

    const getChat = (username1, username2) => {
        let chat = chats.filter(chat => chat.people.includes(username1) && chat.people.includes(username2))[0];
        setReceiver(username1);
        
        chat ? setCurrentChat(chat) : setCurrentChat({ people: [username1, username2], messages: [] });
    };

    const changeHandler = (e) => {
        setNewMessage(e.target.value);
    };

    const getTimeInSeconds = () => {
        const date = new Date();
        const minutes = date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
        return minutes;
    }

    const submitHandler = () => {
        const time = getTimeInSeconds();
        console.log(receiver);
        ws.send(JSON.stringify({ message: newMessage, sender: user.username, receiver, time }));
        const newMessages = currentChat.messages;
        newMessages.push({ username: user.username, message: newMessage, time });
        setCurrentChat(state => ({ people: state.people, messages: newMessages }));
        setNewMessage("");
    };

    return (
        <div>
            {users && chats && 
                <div className="home-body">
                    Hello
                    <div className="chats">
                        {users.map(user => <ChatList key={user.username} userInfo={user} getChat={getChat} chats={chats} />)}
                    </div>
                    {currentChat &&
                        <div className="chat">
                            {currentChat.length != "" && currentChat.messages.map(messageInfo => <Message key= {messageInfo.time} info={messageInfo} isMine={messageInfo.username == user.username} />)}
                            <div className="newMessage">
                                <input name="message" placeholder="Напиши ново съобщение" onChange={changeHandler} value={newMessage} />
                                <button onClick={submitHandler}>Send</button>
                            </div>
                        </div>
                    }

                </div>
            }
        </div>
    );
};

export default Home;