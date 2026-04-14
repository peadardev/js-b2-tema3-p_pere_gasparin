// T3. JavaScript profesional en una aplicación web
// U2. Eventos personalizados (custom events)
// Enunciado disponible en u3e1.md / Enunciat disponible a u3e1.md

//Escribe aquí tu solución / escriviu aquí la vostra solució:
class Sender {
    static TYPE_A = "EVENT_NOTIFICATION_A";
    static TYPE_B = "EVENT_NOTIFICATION_B";
    #refDom;
    type;
    count;
    
    constructor(ref, type) {
        this.#refDom = ref;
        this.type = type;
        this.count = 0;
        this.init();
    }

    init() {
        this.#refDom.addEventListener('click', this.trigger.bind(this));
    }

    trigger(event) {
        event.preventDefault();
        const eventEnvia = new CustomEvent(this.type, {
            detail: {comptador: ++this.count}
            });
        document.dispatchEvent(eventEnvia);
        this.render();
    }

    render() {
        const tipus = this.type.at(-1);
        const comptador = this.count;
        this.#refDom.textContent = `${tipus}: ${comptador}`;
    }
}


class Logger {
    #refDom;
    #notificationsList;
    #eventHandler;

    constructor(ref) {
        this.#refDom = ref;
        this.#notificationsList = [];
        this.init();
    }

    init() {
        this.#eventHandler = this.onNotificationReceived.bind(this);
        for (let type of [Sender.TYPE_A, Sender.TYPE_B]) {
            document.addEventListener(type, this.#eventHandler);
        }
    }

    onNotificationReceived(event) {
        this.#notificationsList.unshift(event);
        this.render();
    }

    render() {;
        const ultimEvent = this.#notificationsList.at(0);
        const nouElement = document.createElement("p");
        nouElement.textContent = `${ultimEvent.type}: ${ultimEvent.detail.comptador}`;
        this.#refDom.appendChild(nouElement);
    }

    destroy() {
        for (let type of [Sender.TYPE_A, Sender.TYPE_B]) {
            document.removeEventListener(type, this.#eventHandler);
        }
    }
}


const notificationADom = document.querySelector('.js-notification-A');
const notificationBDom = document.querySelector('.js-notification-B');
const loggerDom = document.querySelector('.js-logger');

const nA = new Sender(notificationADom, Sender.TYPE_A);
const nB = new Sender(notificationBDom, Sender.TYPE_B);
const logger = new Logger(loggerDom);

notificationADom.click();
notificationADom.click();
notificationBDom.click();
notificationBDom.click();
notificationBDom.click();
notificationBDom.click();
notificationADom.click();

logger.destroy();

notificationADom.click();
notificationBDom.click();
notificationBDom.click();
