'use strict';

const headerContent = `
    <a href="/" id="main-title">
        <h1>Mia.net</h1>
    </a>
    <nav>
        <a href='/chat'>Chat</a>
        <a href='#'>Forum</a>
    </nav>
`;
const footerContent = ``;

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

fillHeader();
fillFooter();
