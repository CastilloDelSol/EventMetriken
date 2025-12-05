// loader.js

// Kleine Helferfunktion um // oder /./ zu entfernen
function normalizePath(path) {
    return path
        .replace(/\/+/g, "/")        // mehrere Slashes zu einem
        .replace(/\/\.\//g, "/")     // /./ entfernen
        .replace(/\/$/, "");         // trailing slash weg
}

(async function() {

    // 1. Loader Position (absolute URL)
    const script = document.currentScript;
    const loaderUrl = new URL(script.src);
    let loaderDir = loaderUrl.pathname.replace(/\/loader\.js$/, "");
    loaderDir = normalizePath(loaderDir);

    // 2. Core dir
    let coreDir = loaderDir.replace(/\/js$/, "");
    coreDir = normalizePath(coreDir);

    // 3. Event dir (URL der Seite, wo index.html liegt)
    const pageUrl = new URL(window.location.href);
    let eventDir = pageUrl.pathname.replace(/\/index\.html$/, "");
    eventDir = normalizePath(eventDir);

    // 4. Template laden
    const templateUrl = normalizePath(coreDir + "/template.html");
    const template = await fetch(templateUrl).then(r => r.text());

    // 5. Platzhalter ersetzen
    let html = template
        .replace(/{{EVENT_NAME}}/g, window.EVENT.name)
        .replace(/{{EVENT_YEAR}}/g, window.EVENT.year)

        // CSS: event first → core second
        .replace("{{EVENT_CSS}}", `<link rel="stylesheet" href="${eventDir}/event.css">`)
        .replace("{{CORE_CSS}}", `<link rel="stylesheet" href="${coreDir}/css/style.css">`)

        // JS: core first → event second
        .replace("{{CORE_JS}}", `<script src="${coreDir}/js/core.js"></script>`)
        .replace("{{EVENT_JS}}", `<script src="${eventDir}/event.js"></script>`)

        .trim();

    // 6. Template rendern
    document.body.innerHTML = html;

    // 7. Nach dem Laden sichtbar machen
    const app = document.getElementById("app");
    if (app) {
        app.classList.remove("app-not-ready");
    }

})();
