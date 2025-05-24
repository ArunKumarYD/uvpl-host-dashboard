const db = firebase.database();
const editableRules = document.getElementById("editableRules");
const statusMsg = document.getElementById("statusMsg");

function loadRules() {
  db.ref("rules").once("value").then(snapshot => {
    editableRules.innerHTML = "";
    snapshot.forEach(child => {
      const li = document.createElement("li");
      li.textContent = child.val();
      editableRules.appendChild(li);
    });
  });
}

function addRule() {
  const rule = document.getElementById("newRule").value.trim();
  if (!rule) return;
  db.ref("rules").push(rule).then(() => {
    statusMsg.textContent = "✅ Rule added!";
    document.getElementById("newRule").value = "";
    loadRules();
  }).catch(err => {
    statusMsg.textContent = "❌ " + err.message;
  });
}

window.onload = loadRules;
