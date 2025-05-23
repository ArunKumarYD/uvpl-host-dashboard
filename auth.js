function login() {
  console.log("Login button clicked"); // ✅ Debugging line
  
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorElem = document.getElementById("loginError");

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
   const emailKey = email.replace(/\./g, ",");
      firebase.database().ref("userRoles/" + emailKey).once("value")
        .then((snapshot) => {
          const role = snapshot.val();
          if (role === "host") {
            window.location.href = "host.html";
          } else if (role === "referee") {
            window.location.href = "referee.html";
          } else {
            errorElem.textContent = "Unauthorized role.";
          }
        });
    })
    .catch((error) => {
      errorElem.textContent = error.message;
    });
}
