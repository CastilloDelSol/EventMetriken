// core.js

importScripts;

/* Minimal core that loads JSON data */

(async function() {
    function loadJSON(url) {
        return fetch(url).then(r => r.json());
    }

    const base = window.location.pathname.replace(/\/index\.html$/, "");
    const dataDir = base + "/data";

    const meta = await loadJSON(dataDir + "/meta.json");
    const results = await loadJSON(dataDir + "/results.json");
    const stats = await loadJSON(dataDir + "/statistics.json");

    document.getElementById("results").innerText =
        `Loaded ${results.length} results`;

    document.getElementById("statistics").innerText =
        JSON.stringify(stats);
})();
