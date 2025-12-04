(function() {

    async function loadTemplate() {

        const event = window.EVENT;

        if (!event || !event.folder)
            return document.body.innerHTML = "<p>Event config fehlt.</p>";

        // Absoluter Web-Pfad dieses Events
        const basePath = location.pathname.replace(/\/index\.html$/, "");

        // Template holen
        const templatePath = basePath + "/../../core/template.html";
        const template = await fetch(templatePath).then(r => r.text());

        // Core Pfad berechnen
        const coreBase = basePath + "/../../core";

        let html = template;

        html = html.replace("{{EVENT_NAME}}", event.name);
        html = html.replace("{{EVENT_YEAR}}", event.year);

        html = html.replace("{{CORE_CSS}}",
            `<link rel="stylesheet" href="${coreBase}/css/style.css">`
        );

        html = html.replace("{{CORE_JS}}",
            `<script type="module" src="${coreBase}/js/core.js"></script>`
        );

        html = html.replace("{{EVENT_CSS}}",
            `<link rel="stylesheet" href="/${event.folder}/event.css">`
        );

        html = html.replace("{{EVENT_JS}}",
            `<script src="/${event.folder}/event.js"></script>`
        );

        document.write(html);
    }

    loadTemplate();

})();
