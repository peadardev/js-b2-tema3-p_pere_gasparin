// T3. JavaScript profesional en una aplicación web
// U1. Trabajo avanzado con el DOM
// Enunciado disponible en u1e1.md / Enunciat disponible a u1e1.md

//Escribe aquí tu solución / escriviu aquí la vostra solució:
function getItems() {
    let nodes = [];
    items = document.querySelectorAll(".js-item");
    items.forEach(element => {
        nodes.push({
            'id': element.dataset.id, 
            'es': element.dataset.es, 
            'en': element.dataset.en})
    });
    return nodes;
}

function emptyList() {
    const nodePare = document.querySelector(".js-list");
    while (nodePare.firstChild) {
        nodePare.removeChild(nodePare.firstChild);
    }
}

function renderList(itemList, lang) {
    emptyList();
    const nodePare = document.querySelector(".js-list");
    itemList.forEach(element => {
        let linia = document.createElement("li");
        linia.classList.add("js-item");
        linia.setAttribute("data-id", element.id);
        linia.setAttribute("data-es", element.es);
        linia.setAttribute("data-en", element.en);
        linia.textContent = element[lang];
        nodePare.appendChild(linia);
    }
    );
}

function updateItemStyle(idItem) {
    items = document.querySelectorAll(".js-item");
    item = Array.from(items).filter(it => it.dataset.id == idItem)[0];
    item.classList.add("highlight");
}

const words = getItems();
renderList(words, 'en');
updateItemStyle('2');
updateItemStyle('4');
