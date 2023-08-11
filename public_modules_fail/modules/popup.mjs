function showPopup() {
  const popup = document.getElementById("popupContainer");
  popup.style.display = "block";
}

function hidePopup() {
  const popup = document.getElementById("popupContainer");
  popup.style.display = "none";
}

export default { showPopup, hidePopup };
