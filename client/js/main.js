'use strict';

fillHeader();
fillFooter();

function fillHeader() {
    let header = document.querySelector('header');
    if (header != null) {
        header.innerHTML = `
            <a href="/"><h1> Mia.net </h1></a>
        `;
    } else {
        console.warn('couldn\'t write header');
    }
}
function fillFooter() {
    let footer = document.querySelector('footer');
    if (footer != null) {
        footer.innerHTML = `
            
        `;
    } else {
        console.warn('couldn\'t write footer');
    }
}
