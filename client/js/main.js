'use strict';

const headerContent = `
    <a href="/" id="main-title">
        <img src="/images/icon.png" alt="logo" id="logo"/>
        <h1>Mia.net</h1>
    </a>
    <nav>
        <a href='/'>Accueil</a>
        <a href='/chat'>Chat</a>
        <a href='/forum'>Forum</a>
        <a href='/file'>Fichiers</a>
    </nav>
`;
const footerContent = ``;

fillHeader();
fillFooter();

function fillHeader() {
    const header = document.querySelector('header');
    if (header != null) {
        header.innerHTML = headerContent;
    } else {
        console.warn("No header found");
    }
}
function fillFooter() {
    const footer = document.querySelector('footer');
    if (footer != null) {
        footer.innerHTML = footerContent;
    } else {
        console.warn("No footer found");
    }
}

function fetchJsonData(addr, callback) {
    fetch(addr)
    .then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(data) {
                callback(data);
            })
            .catch(e => {console.error(e);});
        } else {
            console.error(response+" is not valid");
        }
    })
    .catch(e => {console.error(e);});
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
