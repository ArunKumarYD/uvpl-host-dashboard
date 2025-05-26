const db = firebase.database();

function populatePoints(refPath, tableId) {
  db.ref(refPath).on("value", snapshot => {
    const data = snapshot.val();
    const tbody = document.getElementById(tableId).querySelector("tbody");
    tbody.innerHTML = "";

    if (!data) {
      tbody.innerHTML = "<tr><td colspan='5'>No data</td></tr>";
      return;
    }

    Object.keys(data).forEach(team => {
      const p = data[team];
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${team}</td>
        <td>${p.played ?? 0}</td>
        <td>${p.won ?? 0}</td>
        <td>${p.lost ?? 0}</td>
        <td>${p.points ?? 0}</td>
      `;
      tbody.appendChild(row);
    });
  });
}

window.onload = () => {
  populatePoints("points/Men", "menPoints");
  populatePoints("points/Women", "womenPoints");
};
