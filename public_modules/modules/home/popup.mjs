import { getCookie } from "../cookies/cookies.mjs";
import { bulkEditSloik } from "./homePage.mjs";
import {
  submitPopupBtn,
  popup,
  popupDescription,
  titleInput,
  descriptionInput,
  goalSumInput,
  inputError1,
  inputError2,
  inputError3,
  editPopupBtn,
} from "../../const/locators.mjs";
import { numberRegExp, stringRegExp } from "../../const/regExp.mjs";

function showPopup() {
  popup.style.display = "block";
  editPopupBtn.style.display = "none";

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

function showBulkEditPopup(sloikID) {
  showPopup();
  submitPopupBtn.style.display = "none";
  editPopupBtn.style.display = "block";

  popupDescription.innerText = "Edit Sloik";
  titleInput.value = getCookie(`sloikTitle_${sloikID}`);
  descriptionInput.value = getCookie(`sloikDescription_${sloikID}`);
  goalSumInput.value = getCookie(`goalValue_${sloikID}`);

  editPopupBtn.onclick = function () {
    bulkEditSloik(sloikID);
  };
}

function hidePopup() {
  popup.style.display = "none";
  titleInput.value = "";
  descriptionInput.value = "";
  goalSumInput.value = "";
  inputError1.style.display = "none";
  inputError2.style.display = "none";
  inputError3.style.display = "none";
}

function validatePopupValues() {
  let titleValue = document.getElementById("inputField1").value;
  let descriptionValue = document.getElementById("inputField2").value;
  let goalSumValue = document.getElementById("inputField3").value;
  let inputError1 = document.getElementById("inputField1Error");
  let inputError2 = document.getElementById("inputField2Error");
  let inputError3 = document.getElementById("inputField3Error");
  if (!stringRegExp.test(titleValue)) {
    inputError1.style.display = "block";
  }
  if (!stringRegExp.test(descriptionValue)) {
    inputError2.style.display = "block";
  }
  if (!numberRegExp.test(goalSumValue) || goalSumValue > 0) {
    inputError3.style.display = "block";
  }
  if (
    stringRegExp.test(titleValue) &&
    stringRegExp.test(descriptionValue) &&
    numberRegExp.test(goalSumValue) &&
    goalSumValue > 0
  ) {
    return true;
  }
  return false;
}

export { showPopup, hidePopup, validatePopupValues, showBulkEditPopup };
