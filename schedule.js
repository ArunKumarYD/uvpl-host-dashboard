const db = firebase.database();
const scheduleList = document.getElementById("scheduleList");

function loadSchedule() {
  db.ref("matchSchedule").on("value", snapshot => {
    scheduleList.innerHTML = "";
    snapshot.forEach(child => {
      const match = child.val();

      const matchCard = document.createElement("div");
      matchCard.className = "match-card";

      matchCard.innerHTML = `
        <div class="match-date">📅 ${match.date}</div>
        <div class="match-teams">🏐 <strong>${match.teamA}</strong> vs <strong>${match.teamB}</strong></div>
        <div class="match-time">⏰ ${match.time}</div>
        <hr/>
      `;

      scheduleList.appendChild(matchCard);
    });
  });
}

window.onload = loadSchedule;
