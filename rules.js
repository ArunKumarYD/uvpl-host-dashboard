const db = firebase.database();
const rulesList = document.getElementById("rulesList");

db.ref("rules").on("value", snapshot => {
  rulesList.innerHTML = "";
  snapshot.forEach(child => {
    const li = document.createElement("li");
    li.textContent = child.val();
    rulesList.appendChild(li);
  });
});
