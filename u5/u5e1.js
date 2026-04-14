// T3. JavaScript profesional en una aplicación web
// U4. Almacenamiento local (Cookies)
// Enunciado disponible en u5e1.md / Enunciat disponible a u5e1.md

//Escribe aquí tu solución / escriviu aquí la vostra solució:
class ClipboardApi {
    clipboard;

    constructor(clipboard) {
        this.clipboard = clipboard ?? window.navigator.clipboard;
    }

    async copy(text) {
        const resposta = await this.clipboard.writeText(text);
        return resposta;
    }

    async read() {
        const resposta = await this.clipboard.readText();
        return resposta;
    }
}


export { ClipboardApi };
