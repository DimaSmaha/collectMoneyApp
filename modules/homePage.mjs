import {
  removeCookiesByID,
  bulkUpdateCookies,
  getCookiesByID,
  setCookiesByID,
  replaceCookiesOfDeletedSloik,
} from "./cookies.mjs";
import { hidePopup } from "./popup.mjs";
import { renderExistingSloiks } from "./sloikGeneration.mjs";

function tryToDeleteSloik(sloikID) {
  const editSloikButton = document.getElementById(`editSloikBtn_${sloikID}`);
  const tryToDeleteSloikButton = document.getElementById(`tryToDeleteSloikBtn_${sloikID}`);
  const deleteSloikButton = document.getElementById(`deleteSloikBtn_${sloikID}`);
  const declineDeleteSloikButton = document.getElementById(`declineDeleteSloik_${sloikID}`);
  editSloikButton.style.display = "none";
  tryToDeleteSloikButton.style.display = "none";
  deleteSloikButton.style.display = "inline-block";
  declineDeleteSloikButton.style.display = "inline-block";
}

function resetButtons(sloikID) {
  const editSloikButton = document.getElementById(`editSloikBtn_${sloikID}`);
  const tryToDeleteSloikButton = document.getElementById(`tryToDeleteSloikBtn_${sloikID}`);
  const deleteSloikButton = document.getElementById(`deleteSloikBtn_${sloikID}`);
  const declineDeleteSloikButton = document.getElementById(`declineDeleteSloik_${sloikID}`);
  editSloikButton.style.display = "inline-block";
  tryToDeleteSloikButton.style.display = "inline-block";
  deleteSloikButton.style.display = "none";
  declineDeleteSloikButton.style.display = "none";
}

function deleteSloik(sloikID) {
  const sloiksBoxToDelete = document.getElementById(`sloikBox_${sloikID}`);
  sloiksBoxToDelete.remove();
  removeCookiesByID(sloikID);

  let sloikCounter = JSON.parse(Cookies.get("sloiksCounter"));
  replaceCookiesOfDeletedSloik(sloikID, sloikCounter);
  sloikCounter--;
  Cookies.set("sloiksCounter", JSON.stringify(sloikCounter), { expires: 365 });
  renderExistingSloiks();
}

function bulkEditSloik(sloikID) {
  let titleValue = document.getElementById("inputField1").value;
  let descriptionValue = document.getElementById("inputField2").value;
  let goalSumValue = document.getElementById("inputField3").value;
  let inputError1 = document.getElementById("inputField1Error");
  let inputError2 = document.getElementById("inputField2Error");
  let inputError3 = document.getElementById("inputField3Error");
  if (titleValue == "") {
    inputError1.style.display = "block";
  }
  if (descriptionValue == "") {
    inputError2.style.display = "block";
  }
  if (goalSumValue == "" || isNaN(goalSumValue) == false || goalSumValue > 0) {
    inputError3.style.display = "block";
  }
  if (
    titleValue != "" &&
    descriptionValue != "" &&
    isNaN(goalSumValue) == false &&
    goalSumValue > 0
  ) {
    bulkUpdateCookies(sloikID);
    renderExistingSloiks();
    hidePopup();
  }
}

export { deleteSloik, tryToDeleteSloik, resetButtons, bulkEditSloik };
