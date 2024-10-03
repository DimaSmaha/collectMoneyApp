import loc from "../../const/locators.mjs";
import { getCookie } from "../cookies/cookies.mjs";
import { bulkEditSloik } from "./homePage.mjs";
import { numberRegExp, stringRegExp } from "../../const/regExp.mjs";

function showPopup() {
  loc.popup.style.display = "block";
  loc.editPopupBtn.style.display = "none";

  loc.titleInput.onclick = () => {
    inputError1.style.display = "none";
  };

  loc.descriptionInput.onclick = () => {
    inputError2.style.display = "none";
  };

  loc.goalSumInput.onclick = () => {
    inputError3.style.display = "none";
  };
}
function showBulkEditPopup(sloikID) {
  showPopup();
  loc.submitPopupBtn.style.display = "none";
  loc.editPopupBtn.style.display = "block";

  loc.popupDescription.innerText = "Edit Sloik";
  loc.titleInput.value = getCookie(`sloikTitle_${sloikID}`);
  loc.descriptionInput.value = getCookie(`sloikDescription_${sloikID}`);
  loc.goalSumInput.value = getCookie(`goalValue_${sloikID}`);

  loc.editPopupBtn.onclick = function () {
    bulkEditSloik(sloikID);
  };
}

function hidePopup() {
  loc.popup.style.display = "none";
  loc.titleInput.value = "";
  loc.descriptionInput.value = "";
  loc.goalSumInput.value = "";
  loc.inputError1.style.display = "none";
  loc.inputError2.style.display = "none";
  loc.inputError3.style.display = "none";
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
