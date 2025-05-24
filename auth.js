function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorElem = document.getElementById("loginError");

  console.log("Login button clicked"); // 🐞 Log 1

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("✅ Firebase login successful"); // 🐞 Log 2

      const emailKey = email.replace(/\./g, ",");
      console.log("Checking role for:", emailKey); // 🐞 Log 3

      firebase.database().ref("userRoles/" + emailKey).once("value")
        .then((snapshot) => {
          const role = snapshot.val();
          console.log("✅ Role fetched:", role); // 🐞 Log 4

          if (role === "host") {
            window.location.href = "host.html";
          } else if (role === "referee") {
            window.location.href = "referee.html";
          } else {
            errorElem.textContent = "Unauthorized role.";
            console.log("❌ No valid role");
          }
        });
    })
    .catch((error) => {
      errorElem.textContent = error.message;
      console.log("❌ Firebase error:", error.message); // 🐞 Log 5
    });
}
