const db = firebase.database();
const scheduleTableBody = document.getElementById("scheduleTableBody");

function loadSchedule() {
  db.ref().on("value", snapshot => {
    scheduleTableBody.innerHTML = "";
    snapshot.forEach(child => {
      const match = child.val();
      if(match.date && match.time && match.teamA && match.teamB){
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${match.date}</td>
          <td>${match.time}</td>
          <td>${match.teamA}</td>
          <td>${match.teamB}</td>
        `;
        scheduleTableBody.appendChild(row);
      }
    });
  });
}

window.onload = loadSchedule;
