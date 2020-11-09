'use strict';

getRooms();
const topicAdd = document.getElementById('add-topic');
if (topicAdd != null) {
    topicAdd.addEventListener('click', createTopic);
}

function getRooms() {
    fetchJsonData('/api/room', (rooms) => {
        const roomsList = document.getElementById('rooms');
        roomsList.innerHTML = '';
        for (let r in rooms) {
            const li = document.createElement('li');
            roomsList.appendChild(li);
            li.innerHTML = '<a href="/forum/topic/'+rooms[r].id+'"><button>'+escapeHtml(rooms[r].name)+'</button></a>';
            li.className='topic';
        }
    });
}

function createTopic() {
    const topicName = document.getElementById('topic-name').value;
    if (topicName != "") {
        const room = { name: topicName, creator: user, date: new Date().getTime() };
        console.log("Creating room "+topicName);
        fetch('/api/room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(room)
        }).then((room) => {
            getRooms();
        });
    } else {
        console.error("Empty topic name");
    }
}
