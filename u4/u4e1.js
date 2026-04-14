
// T3. JavaScript profesional en una aplicación web
// U4. Almacenamiento local (Cookies)
// Enunciado disponible en u4e1.md / Enunciat disponible a u4e1.md

//Escribe aquí tu solución / escriviu aquí la vostra solució:
class CookieApi {
    static EXPIRING_DAYS = 365;
    document;

    static expirationDate(nDays) {
        const now = new Date();
        now.setDate(now.getDate() + nDays);
        return now.toUTCString();
    }

    constructor(document) {
        this.document = document ?? window.document;
    }

    setCookie(key, value, nDays) {
        const dies = nDays ?? this.EXPIRING_DAYS;
        const valor = JSON.stringify(value);
        const dataExp = CookieApi.expirationDate(dies);
        this.document.cookie = `${key}=${valor}; expires=${dataExp}; path=/`;
    }

    getCookie(key) {
        const nameEqual = key + '=';
        const cookies = this.document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(nameEqual)) {
                return JSON.parse(cookie.substring(nameEqual.length));
            }
        }
        return null;
    }

    removeCookie(key) {
        const cookieEsborrar = this.getCookie(key);
        if (cookieEsborrar !== null) {
            this.setCookie(key, "", 0);
        }
        return cookieEsborrar;
    }
}

export { CookieApi };
