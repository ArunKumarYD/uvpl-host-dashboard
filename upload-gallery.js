const storage = firebase.storage();
const db = firebase.database();

function uploadImage() {
  const file = document.getElementById("imageInput").files[0];
  if (!file) return;

  const ref = storage.ref("gallery/" + Date.now() + "_" + file.name);
  const uploadStatus = document.getElementById("uploadStatus");

  ref.put(file).then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => db.ref("gallery").push(url))
    .then(() => {
      uploadStatus.textContent = "✅ Image uploaded!";
    })
    .catch(err => {
      uploadStatus.textContent = "❌ " + err.message;
    });
}
