'use strict';

let user = null;
const userChoose = document.getElementById('user-choose');
getUsers();
updateUser();

function updateUser() {
    if (user === null) {
        userChoose.hidden = false;
    } else {
        userChoose.hidden = true;
    }
}

function getUsers() {
    fetchJsonData('/api/user', (users) => {
        //userChoose.innerHTML = '';
        for (let u in users) {
            let button = document.createElement('button');
            userChoose.appendChild(button);
            button.innerHTML = users[u].name;
            button.addEventListener('click', chooseUser(users[u].id));
        }
    })
}

function chooseUser(id) {
    return function() {
        user = id;
        updateUser();
    }
}