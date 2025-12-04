(async function() {
    // 1. SCRIPT-PFAD SELBST ERKENNEN
    const scriptEl = document.currentScript;
    const scriptPath = scriptEl.src;              // absoluter URL-Pfad
    const scriptDir = scriptPath.replace(/\/loader\.js$/, "");  

    // 2. CORE-DIR ist parent:
    const coreDir = scriptDir.replace(/\/js$/, "");

    // 3. EVENT-PFAD herausfinden (dort wo index.html liegt)
    const eventUrl = window.location.pathname;
    const eventDir = eventUrl.replace(/\/index\.html$/, "");

    // 4. Template laden
    const template = await fetch(coreDir + "/template.html").then(r => r.text());

    // 5. EVENT CSS / JS Pfade setzen
    const eventCss = eventDir + "/event.css";
    const eventJs  = eventDir + "/event.js";

    // 6. Ersetzen
    let html = template
        .replace(/{{EVENT_NAME}}/g, window.EVENT.name)
        .replace(/{{EVENT_YEAR}}/g, window.EVENT.year)
        .replace("{{EVENT_CSS}}", `<link rel="stylesheet" href="${eventCss}">`)
        .replace("{{EVENT_JS}}", `<script src="${eventJs}"></script>`);

    // 7. HTML sauber einfügen
    document.body.innerHTML = html;
})();
