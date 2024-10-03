import loc from "../../const/locators.mjs";
import { hidePopup, showBulkEditPopup, validatePopupValues } from "../home/popup.mjs";
import { getCookie, setCookie, setupSloikCookies } from "../cookies/cookies.mjs";
import { deleteSloik, resetButtons, tryToDeleteSloik } from "./homePage.mjs";
import { editBtnSvg } from "../../const/editSvg.mjs";

function addNewSloik() {
  let totalMoney = 0;
  let isGoalReached = false;
  let transactionsArray = [];
  let titleValue = loc.titleInput.value;
  let descriptionValue = loc.descriptionInput.value;
  let goalSumValue = loc.goalSumInput.value;

  if (validatePopupValues()) {
    setupSloikCookies(
      getCurrentSloikCounter(),
      titleValue,
      descriptionValue,
      goalSumValue,
      totalMoney,
      isGoalReached,
      transactionsArray,
    );
    increaseSloikCounter();
    renderExistingSloiks();
    hidePopup();
  }
}

function getCurrentSloikCounter() {
  let sloikCounter = 0;
  if (getCookie("sloiksCounter") != undefined) {
    sloikCounter = getCookie("sloiksCounter");
  }
  return sloikCounter;
}

function increaseSloikCounter() {
  let sloikCounter = 0;
  if (getCookie("sloiksCounter") != undefined) {
    sloikCounter = getCookie("sloiksCounter");
  }
  sloikCounter++;
  setCookie("sloiksCounter", sloikCounter);
}

function renderExistingSloiks() {
  let sloikCounter = parseInt(getCookie("sloiksCounter"));

  loc.sloiksList.innerHTML = "";
  for (let i = 0; i < sloikCounter; i++) {
    sloiksList.insertAdjacentHTML(
      "beforeend",
      `<div id="sloikBox_${i}" class="sloikBox">
          <nav>
            <a id="sloik_${i}" class="sloikNavigation"
            href="./pages/sloik.html" onclick="getSloikID(${i});">
            ${getCookie(`sloikTitle_${i}`)} Sloik</a>
            <button class="edit-button" id="editSloikBtn_${i}"></button>
            <button id="tryToDeleteSloikBtn_${i}" class="cancelBtn sloikCancelBtn">X</button>
            <button class="acceptBtn sloikDeleteButtons" id="deleteSloikBtn_${i}"><b>V</b></button>
            <button class="cancelBtn sloikDeleteButtons" id="declineDeleteSloik_${i}"><b>X</b></button
          </nav>
       </div>`,
    );
  }
  for (let i = 0; i < sloikCounter; i++) {
    loc.sloikTryToDeleteBtns(i).onclick = function () {
      tryToDeleteSloik(i);
    };
    loc.sloikDeleteBtns(i).onclick = function () {
      deleteSloik(i);
    };
    loc.sloikDeclineDeleteBtns(i).onclick = function () {
      resetButtons(i);
    };
    loc.editSloikButton(i).insertAdjacentHTML("afterbegin", editBtnSvg);
    loc.sloikEditBtns(i).onclick = function () {
      showBulkEditPopup(i);
    };
  }
}

function getSloikID(sloikNumber) {
  sloikID = sloikNumber;
  localStorage.setItem("currentSloikID", JSON.stringify(sloikID));
}

export { renderExistingSloiks, addNewSloik, getSloikID };
