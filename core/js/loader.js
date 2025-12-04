(async function() {

    const base = window.EVENT_BASE || ".";

    // template laden
    const tpl = await fetch(`${base}/core/template.html`).then(r => r.text());

    let html = tpl
        .replace(/{{EVENT_NAME}}/g, window.EVENT_NAME)
        .replace(/{{EVENT_YEAR}}/g, window.EVENT_YEAR)
        .replace("{{EVENT_CSS}}",
            `<link rel="stylesheet" href="${base}/events/RatzeburgAdventslauf/${window.EVENT_YEAR}/event.css">`
        )
        .replace("{{EVENT_JS}}",
            `<script src="${base}/events/RatzeburgAdventslauf/${window.EVENT_YEAR}/event.js"></script>`
        );

    document.write(html);

})();
