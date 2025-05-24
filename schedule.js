const db = firebase.database();
const scheduleTable = document.getElementById("scheduleTable");

function loadSchedule() {
  db.ref("schedule").on("value", snapshot => {
    scheduleTable.innerHTML = `
      <tr>
        <th>Date</th>
        <th>Time</th>
        <th>Match</th>
      </tr>
    `;

    snapshot.forEach(child => {
      const match = child.val();
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${match.date || "N/A"}</td>
        <td>${match.time}</td>
        <td>${match.teamA} vs ${match.teamB}</td>
      `;
      scheduleTable.appendChild(row);
    });
  });
}

window.onload = loadSchedule;
