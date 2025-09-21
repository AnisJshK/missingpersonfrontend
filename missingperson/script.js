// Switch between pages
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = "none";
  });
  document.getElementById(pageId).style.display = "block";

  if (pageId === "view") loadReports();
}

// Handle reports in localStorage
function getReports() {
  return JSON.parse(localStorage.getItem("reports")) || [];
}

function saveReports(reports) {
  localStorage.setItem("reports", JSON.stringify(reports));
}

// Submit Report
document.getElementById("reportForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const report = Object.fromEntries(formData.entries());

  let reports = getReports();
  reports.push(report);
  saveReports(reports);

  alert("Report submitted successfully!");
  this.reset();
  showPage("view");
});

// Load Reports
function loadReports() {
  const reports = getReports();
  const container = document.getElementById("reportsList");
  container.innerHTML = "";

  if (reports.length === 0) {
    container.innerHTML = "<p>No reports found.</p>";
    return;
  }

  reports.forEach((r, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>${r.name}</strong> (Age: ${r.age})</p>
      <p>${r.description}</p>
      <p>Last seen: ${r.last_seen}</p>
      <p>Contact: ${r.contact}</p>
      <hr>
    `;
    container.appendChild(div);
  });
}

// Search Reports
document.getElementById("searchForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("searchName").value.toLowerCase();
  const reports = getReports();
  const results = reports.filter(r => r.name.toLowerCase().includes(name));

  const container = document.getElementById("searchResults");
  container.innerHTML = "";

  if (results.length === 0) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }

  results.forEach(r => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>${r.name}</strong> (Age: ${r.age})</p>
      <p>${r.description}</p>
      <p>Last seen: ${r.last_seen}</p>
      <p>Contact: ${r.contact}</p>
      <hr>
    `;
    container.appendChild(div);
  });
});
