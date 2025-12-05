// charts.js

// SIMPLE PLACEHOLDER CHART ENGINE
// Replace with Chart.js or ECharts logic later

window.renderHistogram = function (selector, histogram) {
  const el = document.querySelector(selector);
  el.innerHTML = "Histogram placeholder: " + JSON.stringify(histogram);
};

window.renderLineChart = function (selector, labels, values) {
  const el = document.querySelector(selector);
  el.innerHTML = "LineChart placeholder<br>Years: " + labels.join(", ");
};

// Placeholder for future chart code
console.log("charts.js loaded");
