
// autoPointsUpdater.js

// Call this function after the host sets a winner in the Firebase schedule node
function updatePointsOnMatchResult(matchPath, matchData) {
  const db = firebase.database();
  const winner = matchData.winner;
  const teamA = matchData.teamA || matchData.team1;
  const teamB = matchData.teamB || matchData.team2;
  const gender = (matchData.gender || matchData.category || "Men").trim();
  
  if (!winner || !teamA || !teamB) return console.error("Missing data in match result");

  const loser = winner === teamA ? teamB : teamA;
  const pointsRef = db.ref("points/" + gender);

  // Read current points data
  pointsRef.once("value").then(snapshot => {
    const pointsData = snapshot.val() || {};

    // Initialize teams if they don't exist
    if (!pointsData[winner]) {
      pointsData[winner] = { played: 0, won: 0, lost: 0, points: 0 };
    }
    if (!pointsData[loser]) {
      pointsData[loser] = { played: 0, won: 0, lost: 0, points: 0 };
    }

    // Update stats
    pointsData[winner].played += 1;
    pointsData[winner].won += 1;
    pointsData[winner].points += 2;

    pointsData[loser].played += 1;
    pointsData[loser].lost += 1;

    // Push back to Firebase
    pointsRef.set(pointsData).then(() => {
      console.log("Points updated successfully for", winner, "and", loser);
    }).catch(err => console.error("Failed to update points:", err));
  });
}
