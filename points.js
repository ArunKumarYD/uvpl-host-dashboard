const db = firebase.database();
const table = document.getElementById("pointsTable");

function loadPoints() {
  db.ref("points").on("value", snapshot => {
    const data = snapshot.val();
    const keys = Object.keys(data || {});
    const rows = keys.map(team => {
      const p = data[team];
      return `<tr><td>${team}</td><td>${p.played}</td><td>${p.won}</td><td>${p.lost}</td><td>${p.points}</td></tr>`;
    }).join("");
    table.innerHTML = `<tr><th>Team</th><th>Played</th><th>Won</th><th>Lost</th><th>Points</th></tr>` + rows;
  });
}

window.onload = loadPoints;
