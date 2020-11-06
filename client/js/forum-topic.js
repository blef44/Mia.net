'use strict';

const splitedUrl = window.location.href.split('/');
const topicId = splitedUrl[splitedUrl.length - 1];

getTopicTitle();
getMessages(topicId, document.getElementById('forum-messages'));
document.getElementById('send').addEventListener('click', sendForumMessage);

function getTopicTitle() {
    fetchJsonData('/api/room/'+topicId, (room) => {
        console.log(room);
        const roomTitle = document.getElementById('room-title');
        roomTitle.innerHTML = escapeHtml(room.name);
    });
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

function sendForumMessage() {
    sendMessage(topicId, document.getElementById('message-input'), document.getElementById('forum-messages'));
}
