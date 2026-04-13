// T3. JavaScript profesional en una aplicación web
// U1. Trabajo avanzado con el DOM
// Enunciado disponible en u1e2.md / Enunciat disponible a u1e2.md

const CATEGORY_LIST = [
    {
        id: 1,
        name: 'design'
    }, {
        id: 2,
        name: 'development'
    }, {
        id: 3,
        name: 'consultancy'
    }
];

const PROJECT_LIST = [
    {
        id: 1,
        name: 'First Project',
        excerpt: 'Lorem <strong>ipsum</strong> dolor quan aemet...',
        categoryId: 2,
        progress: 90,
        archived: false,
        search: ['wordA', 'wordB', 'wordC'],
        tags: ['tag1', 'tag2']
    }, {
        id: 2,
        name: 'Second Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 2,
        progress: 50,
        archived: false,
        search: ['wordA', 'wordD'],
        tags: ['tag3']
    }, {
        id: 3,
        name: 'Third Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 1,
        progress: 20,
        archived: false,
        search: ['wordB', 'wordC'],
        tags: ['tag1', 'tag3']
    }, {
        id: 4,
        name: 'Fourth Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 3,
        progress: 100,
        archived: true,
        search: ['wordA', 'wordB'],
        tags: ['tag2']
    }, {
        id: 5,
        name: 'Fifth Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 3,
        progress: 100,
        archived: false,
        search: ['wordA', 'wordC', 'wordD'],
        tags: ['tag1', 'tag2', 'tag3']
    }, {
        id: 6,
        name: 'Sixth Project',
        excerpt: 'Lorem ipsum <strong>dolor quan</strong> aemet...',
        categoryId: 2,
        progress: 100,
        archived: true,
        search: ['wordA', 'wordB', 'wordD'],
        tags: ['tag1']
    },
];

//Escribe aquí tu solución / escriviu aquí la vostra solució:
function renderProjects() {
    const templateProjecte = document.querySelector("#tpl-template").content;
    const templateTag = document.querySelector("#tpl-tag").content;
    const contenidorProjectes = document.querySelector(".js-project-list");
    const fragment = document.createDocumentFragment()

    for (const proj of PROJECT_LIST) {
        const clon = templateProjecte.cloneNode(true);
        const classeProjecte = clon.querySelector(".js-project");

        classeProjecte.dataset.id = proj.id;
        classeProjecte.dataset.tags = proj.tags.join(",");
        classeProjecte.dataset.search = proj.search.join(",");
        classeProjecte.dataset.archived = proj.archived;
        
        classeProjecte.querySelector(".js-name").textContent = proj.name;
        classeProjecte.querySelector(".js-progress").textContent = proj.progress;
        classeProjecte.querySelector(".js-excerpt").innerHTML = proj.excerpt;
        const nomCategoria = CATEGORY_LIST.find(item => item.id === proj.categoryId).name;
        classeProjecte.querySelector(".js-category").textContent = nomCategoria;

        if (proj.archived) {
            classeProjecte.classList.add("archived");
        } 
        if (proj.progress === 100) {
            classeProjecte.classList.add("completed");
        }

        const contenidorTags = classeProjecte.querySelector(".js-tags");
        contenidorTags.textContent = "";
        for (tag of proj.tags) {
            const clonTag = templateTag.cloneNode(true);
            const classeTag = clonTag.querySelector(".js-tag");
            const classeTagLink = classeTag.querySelector(".js-tag-link");
            classeTagLink.dataset.tag = tag;
            classeTagLink.href = tag;
            classeTagLink.textContent = tag;
            contenidorTags.appendChild(classeTag);
        }
        fragment.appendChild(classeProjecte);
    }
    contenidorProjectes.appendChild(fragment);
}

renderProjects();
