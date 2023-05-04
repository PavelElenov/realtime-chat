let chats = [];

const getAllChats = () => {
    return chats;
};

const addMessage = (message, sender, receiver, time) => {
    let chat = chats.filter(c => c.people.includes(sender) && c.people.includes(receiver))[0];

    if(chat){
        chat.messages.push({username:sender, message, time});
    }else{
        chat = {people:[sender, receiver], messages:[{username:sender, message, time}]}
    }

    chats = [...chats, chat]
}

module.exports = {
    getAllChats,
    addMessage
}