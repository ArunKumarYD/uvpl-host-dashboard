const db = firebase.database();
const list = document.getElementById("hostScheduleList");

function addMatch() {
  const teamA = document.getElementById("teamA").value.trim();
  const teamB = document.getElementById("teamB").value.trim();
  const time = document.getElementById("matchTime").value;

  if (!teamA || !teamB || !time) return;

  db.ref("schedule").push({ teamA, teamB, time });
  document.getElementById("teamA").value = "";
  document.getElementById("teamB").value = "";
  document.getElementById("matchTime").value = "";
  loadSchedule();
}

function loadSchedule() {
  db.ref("schedule").once("value", snapshot => {
    list.innerHTML = "";
    snapshot.forEach(child => {
      const match = child.val();
      const li = document.createElement("li");
      li.textContent = `${match.teamA} vs ${match.teamB} @ ${match.time}`;
      list.appendChild(li);
    });
  });
}
window.onload = loadSchedule;
