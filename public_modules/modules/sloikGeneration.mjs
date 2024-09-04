import { showPopup, hidePopup, showBulkEditPopup } from "./popup.mjs";
import { setupSloikCookies } from "./cookies.mjs";
import { deleteSloik, resetButtons, tryToDeleteSloik } from "./homePage.mjs";

function addNewSloik() {
  let totalMoney = 0;
  let isGoalReached = false;
  let transactionsArray = [];
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
  if (Cookies.get("sloiksCounter") != undefined) {
    sloikCounter = Cookies.get("sloiksCounter");
  }
  return sloikCounter;
}

function increaseSloikCounter() {
  let sloikCounter = 0;
  if (Cookies.get("sloiksCounter") != undefined) {
    sloikCounter = Cookies.get("sloiksCounter");
  }
  sloikCounter++;
  Cookies.set("sloiksCounter", JSON.stringify(sloikCounter), { expires: 365 });
}

function renderExistingSloiks() {
  let sloikCounter = parseInt(Cookies.get("sloiksCounter"));
  const sloiksList = document.getElementById("sloiksList");
  sloiksList.innerHTML = "";
  for (let i = 0; i < sloikCounter; i++) {
    sloiksList.insertAdjacentHTML(
      "beforeend",
      `<div id="sloikBox_${i}" class="sloikBox">
          <nav>
            <a id="sloik_${i}" class="sloikNavigation"
            href="./sloik.html" onclick="getSloikID(${i});">
            ${JSON.parse(Cookies.get(`sloikTitle_${i}`))} Sloik</a>
            <button class="edit-button" id="editSloikBtn_${i}">Edit</button>
            <button id="tryToDeleteSloikBtn_${i}" class="cancelBtn sloikCancelBtn">X</button>
            <button class="acceptBtn sloikDeleteButtons" id="deleteSloikBtn_${i}"><b>V</b></button>
            <button class="cancelBtn sloikDeleteButtons" id="declineDeleteSloik_${i}"><b>X</b></button
          </nav>
       </div>`,
    );
  }
  for (let i = 0; i < sloikCounter; i++) {
    let sloikTryToDeleteBtns = document.getElementById(`tryToDeleteSloikBtn_${i}`);
    let sloikDeleteBtns = document.getElementById(`deleteSloikBtn_${i}`);
    let sloikDeclineDeleteBtns = document.getElementById(`declineDeleteSloik_${i}`);
    let sloikEditBtns = document.getElementById(`editSloikBtn_${i}`);
    sloikTryToDeleteBtns.onclick = function () {
      tryToDeleteSloik(i);
    };
    sloikDeleteBtns.onclick = function () {
      deleteSloik(i);
    };
    sloikDeclineDeleteBtns.onclick = function () {
      resetButtons(i);
    };
    sloikEditBtns.onclick = function () {
      showBulkEditPopup(i);
    };
  }
}

function getSloikID(sloikNumber) {
  sloikID = sloikNumber;
  localStorage.setItem("currentSloikID", JSON.stringify(sloikID));
}

export { renderExistingSloiks, addNewSloik, getSloikID };
