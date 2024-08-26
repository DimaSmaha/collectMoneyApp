import { showPopup, hidePopup } from "./popup.mjs";
import { setupSloikCookies } from "./cookies.mjs";
import { deleteSloik } from "./homePage.mjs";

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
      <button id="deleteSloikBtn_${numberOfChildren}" 
      class="cancelBtn sloikCancelBtn"
      >X</button>
      </nav>
    </div>`
  );
  let sloikDeleteBtn = document.getElementById(
    `deleteSloikBtn_${numberOfChildren}`
  );
  sloikDeleteBtn.onclick = function () {
    deleteSloik(numberOfChildren);
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
      <button id="deleteSloikBtn_${i}" 
      class="cancelBtn sloikCancelBtn"
      >X</button>
      </nav>
    </div>`
    );
  }
  for (let i = 0; i < sloikCounter; i++) {
    let sloikDeleteBtns = document.getElementById(`deleteSloikBtn_${i}`);
    sloikDeleteBtns.onclick = function () {
      deleteSloik(i);
    };
  }
}

function getSloikID(sloikNumber) {
  sloikID = sloikNumber;
  localStorage.setItem("currentSloikID", JSON.stringify(sloikID));
}

export { renderExistingSloiks, addSloikData, getSloikID };
