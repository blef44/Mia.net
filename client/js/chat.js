'use strict';

getChatMessages();

function getChatMessages() {
    // On récupère les messages du chat
    fetch('/api/message')
    .then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(messages) {
                console.log(messages);
                let chatMessages = document.getElementById('chatMessages');
                // On affiche les message dans la liste d'id "chatMessages"
                for (let m in messages) {
                    let li = document.createElement('li');
                    chatMessages.appendChild(li);
                    li.innerHTML = '<p>'+messages[m].content+'</p>';
                }
            })
            .catch(e => {console.error(e);});
        }
    })
    .catch(e => {console.error(e);});
}