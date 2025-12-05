// loader.js

function normalizePath(path) {
    return path
        .replace(/\/+/g, "/")
        .replace(/\/\.\//g, "/")
        .replace(/\/$/, "");
}

(async function() {

    const script = document.currentScript;
    const loaderUrl = new URL(script.src);

    let loaderDir = normalizePath(loaderUrl.pathname.replace(/\/loader\.js$/, ""));
    let coreDir = normalizePath(loaderDir.replace(/\/js$/, ""));

    const pageUrl = new URL(window.location.href);
    let eventDir = normalizePath(pageUrl.pathname.replace(/\/index\.html$/, ""));

    // --- Template Laden ---
    const templateUrl = normalizePath(coreDir + "/template.html");
    const template = await fetch(templateUrl).then(r => r.text());

    // --- Platzhalter ersetzen ---
    let html = template
        .replace(/{{EVENT_NAME}}/g, window.EVENT.name)
        .replace(/{{EVENT_YEAR}}/g, window.EVENT.year)
        .replace("{{CORE_CSS}}", `<link rel="stylesheet" href="${coreDir}/css/style.css">`)
        .replace("{{EVENT_CSS}}", `<link rel="stylesheet" href="${eventDir}/event.css">`)
        .replace("{{CORE_JS}}", `<script src="${coreDir}/js/core.js"></script>`)
        .replace("{{EVENT_JS}}", `<script src="${eventDir}/event.js"></script>`)
        .trim();

    // --- HTML Setzen ---
    document.body.innerHTML = html;

    // --- Warten bis ALLES geladen ist (inkl. CSS!) ---
    window.addEventListener("load", () => {
        const app = document.getElementById("app");
        if (app) {
            app.classList.remove("app-not-ready");
        }
    });

})();
