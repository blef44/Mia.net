messagesUl = document.getElementById('messages');

fetchJsonData('/api/message', (messages) => {
    messages = messages.reverse().filter(i => messages.indexOf(i)<5)
    fetchJsonData('/api/user', (users) => {
        fetchJsonData('/api/room', (rooms) => {
            messagesUl.innerHTML = '';
            for (let m in messages) {
                const li = document.createElement('li');
                messagesUl.appendChild(li);
                const roomLink = messages[m].room==-1 ? '<a href="/chat">le chat</a>' :
                    '<a href="/forum/topic/'+messages[m].room+'">'+rooms.find(e=>e.id===messages[m].room).name+'</a>';
                li.innerHTML =
                    '<div class="message">'+
                        '<h3>'+escapeHtml(users.find(e=>e.id===messages[m].sender).name)+
                        ' <span class="room">dans ' + roomLink +'</span></h3>'+
                        '<p>'+escapeHtml(messages[m].content)+'</p>'+
                    '</div>';
            }
        });
    });
});
