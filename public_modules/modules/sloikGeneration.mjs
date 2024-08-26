import { showPopup, hidePopup } from "./popup.mjs";
import { setupSloikCookies } from "./cookies.mjs";
import { deleteSloik, resetButtons, tryToDeleteSloik } from "./homePage.mjs";

let sloikTitle = "";
let sloikDescription = "";
function addSloikData(
  cookiesTotalMoney,
  cookiesIsGoalReached,
  cookiesTransactionsArray
) {
  let titleValue = document.getElementById("inputField1").value;
  let descriptionValue = document.getElementById("inputField2").value;
  let goalSumValue = document.getElementById("inputField3").value;
  let titleInput = document.getElementById("inputField1");
  let descriptionInput = document.getElementById("inputField2");
  let goalSumInput = document.getElementById("inputField3");
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
    sloikTitle = titleValue;
    sloikDescription = descriptionValue;
    hidePopup();
    renderSloik();
    setupSloikCookies(
      numberOfChildren,
      sloikTitle,
      sloikDescription,
      cookiesTotalMoney,
      cookiesIsGoalReached,
      cookiesTransactionsArray
    );
    titleInput.value = "";
    descriptionInput.value = "";
    goalSumInput.value = "";
  }
}

let numberOfChildren;
let sloikCounter = 0;
function renderSloik() {
  if (Cookies.get("sloiksCounter") != undefined) {
    sloikCounter = Cookies.get("sloiksCounter");
  }
  const sloiksList = document.getElementById("sloiksList");
  numberOfChildren = sloiksList.children.length;
  sloikCounter++;
  Cookies.set("sloiksCounter", JSON.stringify(sloikCounter), { expires: 365 });
  sloiksList.insertAdjacentHTML(
    "beforeend",
    `<div id="sloikBox_${numberOfChildren}" class="sloikBox">
      <nav>
      <a id="sloik_${numberOfChildren}" class="sloikNavigation"
      href="./sloik.html" onclick="getSloikID(${numberOfChildren});">
      ${sloikTitle} Sloik</a>
      <button id="tryToDeleteSloikBtn_${numberOfChildren}" class="cancelBtn sloikCancelBtn">X</button>
      <button class="acceptBtn sloikDeleteButtons" id="deleteSloikBtn_${numberOfChildren}"><b>V</b></button>
      <button class="cancelBtn sloikDeleteButtons" id="declineDeleteSloik_${numberOfChildren}"><b>X</b></button
      </nav>
    </div>`
  );
  let sloikTryToDeleteBtns = document.getElementById(
    `tryToDeleteSloikBtn_${numberOfChildren}`
  );
  let sloikDeleteBtns = document.getElementById(
    `deleteSloikBtn_${numberOfChildren}`
  );
  let sloikDeclineDeleteBtns = document.getElementById(
    `declineDeleteSloik_${numberOfChildren}`
  );
  sloikTryToDeleteBtns.onclick = function () {
    tryToDeleteSloik(numberOfChildren);
  };
  sloikDeleteBtns.onclick = function () {
    deleteSloik(numberOfChildren);
  };
  sloikDeclineDeleteBtns.onclick = function () {
    resetButtons(numberOfChildren);
  };
}

function renderExistingSloiks() {
  let sloikCounter = parseInt(Cookies.get("sloiksCounter"));
  const sloiksList = document.getElementById("sloiksList");
  for (let i = 0; i < sloikCounter; i++) {
    sloiksList.insertAdjacentHTML(
      "beforeend",
      `<div id="sloikBox_${i}" class="sloikBox">
      <nav>
      <a id="sloik_${i}" class="sloikNavigation"
      href="./sloik.html" onclick="getSloikID(${i});">
      ${JSON.parse(Cookies.get(`sloikTitle_${i}`))} Sloik</a>
      <button id="tryToDeleteSloikBtn_${i}" class="cancelBtn sloikCancelBtn">X</button>
      <button class="acceptBtn sloikDeleteButtons" id="deleteSloikBtn_${i}"><b>V</b></button>
      <button class="cancelBtn sloikDeleteButtons" id="declineDeleteSloik_${i}"><b>X</b></button
      </nav>
    </div>`
    );
  }
  for (let i = 0; i < sloikCounter; i++) {
    let sloikTryToDeleteBtns = document.getElementById(
      `tryToDeleteSloikBtn_${i}`
    );
    let sloikDeleteBtns = document.getElementById(`deleteSloikBtn_${i}`);
    let sloikDeclineDeleteBtns = document.getElementById(
      `declineDeleteSloik_${i}`
    );
    sloikTryToDeleteBtns.onclick = function () {
      tryToDeleteSloik(i);
    };
    sloikDeleteBtns.onclick = function () {
      deleteSloik(i);
    };
    sloikDeclineDeleteBtns.onclick = function () {
      resetButtons(i);
    };
  }
}

function getSloikID(sloikNumber) {
  sloikID = sloikNumber;
  localStorage.setItem("currentSloikID", JSON.stringify(sloikID));
}

export { renderExistingSloiks, addSloikData, getSloikID };
