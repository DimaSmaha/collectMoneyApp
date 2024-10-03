import {
  removeCookiesByID,
  bulkUpdateCookies,
  replaceCookiesOfDeletedSloik,
  getCookie,
  setCookie,
} from "../cookies/cookies.mjs";
import { hidePopup, validatePopupValues } from "./popup.mjs";
import { numberRegExp, stringRegExp } from "../../const/regExp.mjs";
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

  let sloikCounter = getCookie("sloiksCounter");
  replaceCookiesOfDeletedSloik(sloikID, sloikCounter);
  sloikCounter--;
  setCookie("sloiksCounter", sloikCounter);
  renderExistingSloiks();
}

function bulkEditSloik(sloikID) {
  if (validatePopupValues()) {
    bulkUpdateCookies(sloikID);
    renderExistingSloiks();
    hidePopup();
  }
}

export { deleteSloik, tryToDeleteSloik, resetButtons, bulkEditSloik };
