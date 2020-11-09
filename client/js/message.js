'use strict';

function getMessages(roomId, messagesUl) {
    // On récupère les messages du chat
    fetchJsonData('/api/room/'+roomId+'/messages', (messages) => {
        fetchJsonData('/api/user', (users) => {
            messagesUl.innerHTML = '';
            for (let m in messages) {
                const li = document.createElement('li');
                messagesUl.appendChild(li);
                li.innerHTML =
                    '<div class="message">'+
                        '<h3>'+escapeHtml(users.find(e=>e.id===messages[m].sender).name)+'</h3>'+
                        '<p>'+escapeHtml(messages[m].content)+'</p>'+
                    '</div>';
            }
        })
    })
}

function sendMessage(roomId, messageInput, messageUl) {
    if (user != null) {
        const messageContent = messageInput.value;
        const message = {sender: user, room: roomId, date: new Date().getTime(), content: messageContent};
        console.log("Sending message: "+messageContent);
        fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(message)
        }).then(() => {
            getMessages(roomId, messageUl);
        });
        document.getElementById('message-input').value = '';
    } else {
        console.error("No user selected");
    }
}
