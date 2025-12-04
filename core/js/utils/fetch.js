// fetch.js

export async function loadJSON(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error("Failed to load " + url);
    return r.json();
}
