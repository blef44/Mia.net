'use strict';

// require main.js

document.getElementById('send').addEventListener('click', sendMessage);
getChatMessages();

function getChatMessages() {
    // On récupère les messages du chat
    fetchJsonData('api/message', (messages) => {
        let chatMessages = document.getElementById('chat-messages');
        chatMessages.innerHTML = '';
        // On affiche les message dans la liste d'id "chatMessages"
        for (let m in messages) {
            let li = document.createElement('li');
            chatMessages.appendChild(li);
            li.innerHTML =
                '<div class="message">'+
                    '<h3>'+escapeHtml(messages[m].sender)+'</h3>'+
                    '<p>'+escapeHtml(messages[m].content)+'</p>'+
                '</div>';
        }
    })
}

function sendMessage() {
    const messageContent = document.getElementById('message-input').value;
    console.log("Sending message: "+messageContent);
    const message = {sender: "Mia", time: new Date().getTime(), content: messageContent};
    fetch('/api/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(message)
    })
    /*.then(function(response) {
         getChatMessages();
    });*/

}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }