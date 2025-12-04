(async function() {

    // 1. Loader Position (absolute URL)
    const script = document.currentScript;
    const loaderUrl = new URL(script.src);
    const loaderDir = loaderUrl.pathname.replace(/\/loader\.js$/, "");

    // 2. Core dir
    const coreDir = loaderDir.replace(/\/js$/, "");

    // 3. Event dir (URL der Seite, wo index.html liegt)
    const pageUrl = new URL(window.location.href);
    const eventDir = pageUrl.pathname.replace(/\/index\.html$/, "");

    // 4. Template laden
    const templateUrl = coreDir + "/template.html";
    const template = await fetch(templateUrl).then(r => r.text());

    // 5. Platzhalter ersetzen
    let html = template
        .replace(/{{EVENT_NAME}}/g, window.EVENT.name)
        .replace(/{{EVENT_YEAR}}/g, window.EVENT.year)

        // Core includes (absolute korrekt)
        .replace("{{CORE_CSS}}",
            `<link rel="stylesheet" href="${coreDir}/css/style.css">`)
        .replace("{{CORE_JS}}",
            `<script src="${coreDir}/js/core.js"></script>`)

        // Event includes (korrekt relativ zum Event)
        .replace("{{EVENT_CSS}}",
            `<link rel="stylesheet" href="${eventDir}/event.css">`)
        .replace("{{EVENT_JS}}",
            `<script src="${eventDir}/event.js"></script>`);

    // 6. Template rendern
    document.body.innerHTML = html;

})();
