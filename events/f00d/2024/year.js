// Load results
fetch("data/results.json")
  .then(r => r.json())
  .then(results => {
    let html = "<table><tr><th>Name</th><th>Time</th></tr>";
    results.forEach(r => {
      html += `<tr><td>${r.name}</td><td>${r.time}</td></tr>`;
    });
    html += "</table>";
    document.getElementById("results").innerHTML = html;
  });

// Load statistics
fetch("data/stats.json")
  .then(r => r.json())
  .then(stat => {
    renderHistogram("#hist", stat.histogram);
  });
