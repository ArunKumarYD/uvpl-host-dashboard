const db = firebase.database();
const galleryGrid = document.getElementById("galleryGrid");

function loadGallery() {
  db.ref("gallery").on("value", snapshot => {
    galleryGrid.innerHTML = "";
    snapshot.forEach(child => {
      const imgUrl = child.val();
      const img = document.createElement("img");
      img.src = imgUrl;
      img.style.width = "100%";
      img.style.borderRadius = "10px";
      galleryGrid.appendChild(img);
    });
  });
}
window.onload = loadGallery;
