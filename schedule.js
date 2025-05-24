const db = firebase.database();
const scheduleTableBody = document.getElementById("scheduleTableBody");

function loadSchedule() {
  db.ref("schedule").once("value", snapshot => {
    scheduleTableBody.innerHTML = "";
    snapshot.forEach(child => {
      const match = child.val();
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${match.date}</td>
        <td>${match.time}</td>
        <td>${match.teamA}</td>
        <td>${match.teamB}</td>
      `;

      scheduleTableBody.appendChild(row);
    });
  });
}

window.onload = loadSchedule;
