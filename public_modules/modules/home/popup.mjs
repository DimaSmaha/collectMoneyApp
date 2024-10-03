import loc from "../../const/locators.mjs";
import { getCookie } from "../cookies/cookies.mjs";
import { bulkEditSloik } from "./homePage.mjs";
import { numberRegExp, stringRegExp } from "../../const/regExp.mjs";

function showPopup() {
  loc.popup.style.display = "block";
  loc.popupDescription.innerText = "Create a Sloik";
  loc.submitPopupBtn.style.display = "block";
  loc.editPopupBtn.style.display = "none";

  loc.titleInput.onclick = () => {
    loc.inputError1.style.display = "none";
  };

  loc.descriptionInput.onclick = () => {
    loc.inputError2.style.display = "none";
  };

  loc.goalSumInput.onclick = () => {
    loc.inputError3.style.display = "none";
  };
}

function showBulkEditPopup(sloikID) {
  showPopup();
  loc.popupDescription.innerText = "Edit Sloik";
  loc.submitPopupBtn.style.display = "none";
  loc.editPopupBtn.style.display = "block";

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
  let titleValue = loc.titleInput.value;
  let descriptionValue = loc.descriptionInput.value;
  let goalSumValue = loc.goalSumInput.value;
  let inputError1 = loc.inputError1;
  let inputError2 = loc.inputError2;
  let inputError3 = loc.inputError3;

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
