const db = firebase.database();
const storage = firebase.storage();

const teamSelect = document.getElementById("teamSelect");
const logoInput = document.getElementById("logoInput");
const uploadStatus = document.getElementById("uploadStatus");
const playerName = document.getElementById("playerName");
const playerList = document.getElementById("playerList");

function uploadLogo() {
  const file = logoInput.files[0];
  if (!file) return;

  const team = teamSelect.value;
  const storageRef = storage.ref("team-logos/" + team + ".png");

  storageRef.put(file).then(snapshot => {
    return snapshot.ref.getDownloadURL();
  }).then(url => {
    return db.ref("teams/" + team).update({ logoURL: url });
  }).then(() => {
    uploadStatus.textContent = "✅ Logo uploaded successfully!";
  }).catch(err => {
    uploadStatus.textContent = "❌ Error: " + err.message;
  });
}

function addPlayer() {
  const name = playerName.value.trim();
  if (!name) return;

  const team = teamSelect.value;
  db.ref("teams/" + team + "/players").push(name);
  playerName.value = "";
  loadPlayers();
}

function loadPlayers() {
  const team = teamSelect.value;
  playerList.innerHTML = "";

  db.ref("teams/" + team + "/players").once("value", snapshot => {
    snapshot.forEach(child => {
      const li = document.createElement("li");
      li.textContent = child.val();
      playerList.appendChild(li);
    });
  });
}

teamSelect.addEventListener("change", loadPlayers);
window.onload = loadPlayers;
