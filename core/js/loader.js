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

    // 3. Event dir (URL der Seite)
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
        .replace("{{CORE_CSS}}", `<link rel="stylesheet" href="${coreDir}/css/style.css">`)
        .replace("{{CORE_JS}}", `<script src="${coreDir}/js/core.js"></script>`)
        .replace("{{EVENT_CSS}}", `<link rel="stylesheet" href="${eventDir}/event.css">`)
        .replace("{{EVENT_JS}}", `<script src="${eventDir}/event.js"></script>`)
        .trim();

    // 6. HTML setzen
    document.body.innerHTML = html;

    // 7. Sichtbar machen (fixes FOUC)
    
    const app = document.getElementById("app");
    if (app) app.classList.remove("app-not-ready");
    

    /*
    window.addEventListener("load", () => {
    document.body.style.visibility = "visible";
    */

    /*
    window.addEventListener("load", () => {
        document.body.style.visibility = "visible";
        const app = document.getElementById("app");
        if (app) app.classList.remove("app-not-ready");
    });
    */

});


})();
