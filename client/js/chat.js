'use strict';

// require main.js, user.js

document.getElementById('send').addEventListener('click', sendChatMessage);
Update();

const chatRoomId = -1;
let renderedMessagesNumber = 8;

function Update() {
    getMessages(-1, document.getElementById('chat-messages'));
    //getChatUser();
    setTimeout(Update, 1000);
}

function onUserChosen() {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send');
    if (user === null) {
        messageInput.placeholder = 'Choisissez un utilisateur pour commencer à chatter';
        messageInput.disabled = true;
        sendButton.disabled = true;
    } else {
        messageInput.placeholder = 'Typez votre message';
        messageInput.disabled = false;
        sendButton.disabled = false;
    }
}

function sendChatMessage() {
    sendMessage(-1, document.getElementById('message-input'), document.getElementById('chat-messages'));
}
/*function sendMessage() {
    if (user != null) {
        const messageContent = document.getElementById('message-input').value;
        const message = {sender: user, room: chatRoomId, time: new Date().getTime(), content: messageContent};
        console.log("Sending message: "+messageContent);
        fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(message)
        }).then(() => {
            getChatMessages();
        });
        document.getElementById('message-input').value = '';
    } else {
        console.error("No user selected");
    }
}*/
