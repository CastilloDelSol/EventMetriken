// core.js – zentraler Loader

export let EVENT = null;

async function loadEventData() {
    const base = window.EVENT_BASE; // von event/index.html gesetzt

    const res = await fetch(`${base}/data/results.json`);
    const hist = await fetch(`${base}/data/histogram.json`);
    const meta = await fetch(`${base}/data/meta.json`);

    EVENT = {
        results: await res.json(),
        histogram: await hist.json(),
        meta: await meta.json()
    };
}

// ------------------------------------------------------------
// Bootstrapping – wird nach Laden gestartet
// ------------------------------------------------------------
async function initCore() {

    await loadEventData();

    // Deine Visualisierungsmodi hier starten
    import("/core/js/modules/donuts.js").then(m => m.render(EVENT));
    import("/core/js/modules/histograms.js").then(m => m.render(EVENT));
    import("/core/js/modules/agegroups.js").then(m => m.render(EVENT));

    // Event-overrides laden
    if (window.EVENT_JS_LOADER) {
        window.EVENT_JS_LOADER(EVENT);
    }
}

initCore();
