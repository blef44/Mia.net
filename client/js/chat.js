'use strict';

// require main.js

document.getElementById('send').addEventListener('click', sendMessage);
getChatMessages();

function getChatMessages() {
    // On récupère les messages du chat
    fetchJsonData('api/message', (messages) => {
        let chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';
        // On affiche les message dans la liste d'id "chatMessages"
        for (let m in messages) {
            let li = document.createElement('li');
            chatMessages.appendChild(li);
            li.innerHTML = '<p>'+messages[m].content+'</p>';
        }
    })
}

function sendMessage() {
    const messageContent = document.getElementById('message').value;
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