import loc from "../../const/locators.mjs";
import {
  removeCookiesByID,
  bulkUpdateCookies,
  replaceCookiesOfDeletedSloik,
  getCookie,
  setCookie,
} from "../cookies/cookies.mjs";
import { hidePopup, validatePopupValues } from "./popup.mjs";
import { renderExistingSloiks } from "./sloikGeneration.mjs";

function tryToDeleteSloik(sloikID) {
  loc.editSloikButton(sloikID).style.display = "none";
  loc.tryToDeleteSloikButton(sloikID).style.display = "none";
  loc.deleteSloikButton(sloikID).style.display = "inline-block";
  loc.declineDeleteSloikButton(sloikID).style.display = "inline-block";
}

function resetButtons(sloikID) {
  loc.editSloikButton(sloikID).style.display = "inline-block";
  loc.tryToDeleteSloikButton(sloikID).style.display = "inline-block";
  loc.deleteSloikButton(sloikID).style.display = "none";
  loc.declineDeleteSloikButton(sloikID).style.display = "none";
}

function deleteSloik(sloikID) {
  loc.sloiksBoxToDelete(sloikID).remove();
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
