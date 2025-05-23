const db = firebase.database();
const scheduleList = document.getElementById("scheduleList");

function loadSchedule() {
  db.ref("schedule").on("value", snapshot => {
    scheduleList.innerHTML = "";
    snapshot.forEach(child => {
      const match = child.val();
      const li = document.createElement("li");
      li.textContent = `${match.teamA} vs ${match.teamB} @ ${match.time}`;
      scheduleList.appendChild(li);
    });
  });
}
window.onload = loadSchedule;
