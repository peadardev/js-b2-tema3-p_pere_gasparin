// T3. JavaScript profesional en una aplicación web
// U2. Delegación de eventos
// Enunciado disponible en u2e1.md / Enunciat disponible a u2e1.md

const TASK_LIST = [
    {
        name: 'Work',
        done: false,
    },
    {
        name: 'Shopping',
        done: false,
    },
    {
        name: 'Call mom',
        done: true,
    },
];

//Escribe aquí tu solución / escriviu aquí la vostra solució:
class TodoList {
    #appRef;
    #listRef;
    #totTpl;

    constructor(appRef, listRef, totTpl) {
        this.#appRef = appRef;
        this.#listRef = listRef;
        this.#totTpl = totTpl;
        this.list = [];
        this.init();
    }

    init() {
        const linkAdd = this.#appRef.querySelector(".js-todo-add");
        linkAdd.addEventListener('click', (event) => {
            event.preventDefault();
            const nom = this.#appRef.querySelector(".js-todo-new-name").value;
            this.add(nom, false);
        });

        this.#listRef.addEventListener('click', (event) => {
            event.preventDefault();
            if (event.target.classList.contains("js-todo-done")) {
                const nomTask = event.target.parentElement.dataset.todo;
                this.toggle(nomTask);
            }
            if (event.target.classList.contains("js-todo-delete")) {
                const nomTask = event.target.parentElement.dataset.todo;
                this.remove(nomTask);
            }
        });
    }

    add(todo, status) {
        if (todo.trim() === "") {
            return false;
        }
        const mateixNom = this.list.filter(task => task.name == todo.trim());
        if (mateixNom.length > 0) {
            return false;
        }
        this.list.push({name: todo.trim(), done: status});
        this.rendre();
    }

    remove(nom) {
        const index = this.list.findIndex(task => task.name === nom);
        if (index !== -1) {
            this.list.splice(index, 1);
            this.rendre();
        }
    }

    toggle(nom) {
        const index = this.list.findIndex(task => task.name === nom);
        if (index !== -1) {
            this.list[index].done = !this.list[index].done;
            this.rendre();
        }
    }

    rendre() {
        while (this.#listRef.firstChild) {
            this.#listRef.removeChild(this.#listRef.firstChild);
        }

        const fragment = document.createDocumentFragment()
        this.list.forEach(task => {
            const clon = this.#totTpl.content.cloneNode(true);
            const classeTodo = clon.querySelector(".js-todo");
            const classeTodoName = classeTodo.querySelector(".js-todo-name");
            const classeTodoDone = classeTodo.querySelector(".js-todo-done");
            const classeTodoDelete = classeTodo.querySelector(".js-todo-delete");
            classeTodoDelete.href = "";

            classeTodo.dataset.todo = task.name;
            classeTodo.dataset.done = task.done;
            
            classeTodoName.textContent = task.name;
            classeTodoDone.textContent = task.done ? "done" : "pending";
            classeTodoDone.href = "";

            fragment.appendChild(clon);
        });
        this.#listRef.appendChild(fragment);
    }
}


const appRef = document.querySelector("#app");
const listRef = document.querySelector(".js-todo-list");
const totTpl = document.querySelector("#tpl-todo");
todosApp = new TodoList(appRef, listRef, totTpl);

TASK_LIST.forEach(task => {
    todosApp.add(task.name, task.done);
});

todosApp.add('New one', false);
todosApp.toggle('Shopping');
todosApp.remove('Call mom');
todosApp.add('Another one', true);

document.querySelector('.js-todo-new-name').value = 'Test';
document.querySelector('.js-todo-add').click();

document.querySelector('.js-todo[data-todo="New one"] .js-todo-done').click();
document.querySelector('.js-todo[data-todo="Another one"] .js-todo-delete').click();
