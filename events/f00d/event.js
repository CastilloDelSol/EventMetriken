// Build Year List
const ul = document.getElementById("year-list");

window.EVENT.years.forEach(year => {
  const li = document.createElement("li");
  li.innerHTML = `<a href="./${year}/">${year}</a>`;
  ul.appendChild(li);
});

// Trend chart uses meta.json from each year
Promise.all(
  window.EVENT.years.map(y =>
    fetch(`./${y}/data/meta.json`).then(r => r.json())
  )
).then(yearsData => {
  const labels = window.EVENT.years;
  const participants = yearsData.map(d => d.participants || 0);

  renderLineChart("#trend-chart", labels, participants);
});
