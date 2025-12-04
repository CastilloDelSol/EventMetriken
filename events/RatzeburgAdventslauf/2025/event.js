// event.js

export async function loadEventSettings() {
    const res = await fetch(`${window.EVENT.dir}/data/settings.json`);
    window.EVENT.settings = await res.json();
}
