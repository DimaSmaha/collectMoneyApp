function showPopup() {
  const popup = document.getElementById("popupContainer");
  popup.style.display = "block";

  titleInput.onclick = () => {
    inputError1.style.display = "none";
  };

  descriptionInput.onclick = () => {
    inputError2.style.display = "none";
  };

  goalSumInput.onclick = () => {
    inputError3.style.display = "none";
  };
}

const titleInput = document.getElementById("inputField1");
const descriptionInput = document.getElementById("inputField2");
const goalSumInput = document.getElementById("inputField3");
const inputError1 = document.getElementById("inputField1Error");
const inputError2 = document.getElementById("inputField2Error");
const inputError3 = document.getElementById("inputField3Error");

function hidePopup() {
  const popup = document.getElementById("popupContainer");
  popup.style.display = "none";
  titleInput.value = "";
  descriptionInput.value = "";
  goalSumInput.value = "";
  inputError1.style.display = "none";
  inputError2.style.display = "none";
  inputError3.style.display = "none";
}

export { showPopup, hidePopup };
