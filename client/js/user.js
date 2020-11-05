'use strict';

let user = null;
const userChooseSection = document.getElementById('user-choose-section');
if (userChooseSection != null) {
    getUsers();
    updateUser();
}
const userAdd = document.getElementById('user-add');
if (userAdd != null) {
    userAdd.addEventListener('click', createUser);
}

function updateUser() {
    if (user === null) {
        userChooseSection.hidden = false;
    } else {
        userChooseSection.hidden = true;
    }
}

function getUsers() {
    fetchJsonData('/api/user', (users) => {
        const userChoose = document.getElementById('user-choose');
        //userChoose.innerHTML = '';
        for (let u in users) {
            let button = document.createElement('button');
            userChoose.appendChild(button);
            button.className = 'user';
            button.innerHTML = '<label>'+users[u].name+'</label>';
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


function createUser() {
    const userName = document.getElementById('user-name').value;
    const user = { name: userName };
    fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    }).then(() => {
        console.log("bite");
        getUsers();
    });
}
