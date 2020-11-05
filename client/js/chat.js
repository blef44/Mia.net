'use strict';

// require main.js, user.js

document.getElementById('send').addEventListener('click', sendMessage);
Update();

let renderedMessagesNumber = 8;

function Update() {
    getChatMessages();
    getChatUser();
    setTimeout(Update, 1000);
}

function getChatMessages() {
    // On récupère les messages du chat
    fetchJsonData('/api/room/0/messages', (messages) => {
        fetchJsonData('/api/user', (users) => {
            const chatMessages = document.getElementById('chat-messages');
            chatMessages.innerHTML = '';
            messages = messages.slice(Math.max(0, messages.length-renderedMessagesNumber));
            for (let m in messages) {
                let li = document.createElement('li');
                chatMessages.appendChild(li);
                li.innerHTML =
                    '<div class="message">'+
                        '<h3>'+users.find(e=>e.id===messages[m].sender).name+'</h3>'+
                        '<p>'+escapeHtml(messages[m].content)+'</p>'+
                    '</div>';
            }
        })
    })
}

function getChatUser() {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send');
    if (user === null) {
        messageInput.placeholder = 'Choisissez un utilisateur pour commencer à chatter';
        sendButton.disabled = true;
    } else {
        messageInput.placeholder = 'Typez votre message';
        sendButton.disabled = false;
    }
}

function sendMessage() {
    if (user != null) {
        const messageContent = document.getElementById('message-input').value;
        const message = {sender: user, room: 0, time: new Date().getTime(), content: messageContent};
        console.log("Sending message: "+messageContent);
        console.log(message);
        fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(message)
        }).then(() => {
            console.log("bite");
            getChatMessages();
        });
        document.getElementById('message-input').value = '';
    } else {
        console.error("No user selected");
    }
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }