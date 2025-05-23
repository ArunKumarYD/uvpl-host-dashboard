const db = firebase.database();

function updatePoints() {
  const team = document.getElementById("teamSelect").value;
  const played = parseInt(document.getElementById("played").value) || 0;
  const won = parseInt(document.getElementById("won").value) || 0;
  const lost = parseInt(document.getElementById("lost").value) || 0;
  const points = parseInt(document.getElementById("points").value) || 0;

  db.ref("points/" + team).set({ played, won, lost, points });
  alert("Points updated!");
}
