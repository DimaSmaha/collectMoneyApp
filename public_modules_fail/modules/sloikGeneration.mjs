import { showPopup, hidePopup } from "./popup.mjs";
import { setupSloikCookies } from "./cookies.mjs";

let sloikTitle = "";
let sloikDescription = "";
function addSloikData() {
  let titleValue = document.getElementById("inputField1").value;
  let descriptionValue = document.getElementById("inputField2").value;
  let goalSumValue = document.getElementById("inputField3").value;
  let titleInput = document.getElementById("inputField1");
  let descriptionInput = document.getElementById("inputField2");
  let goalSumInput = document.getElementById("inputField3");
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
    setupSloikCookies(numberOfChildren, sloikTitle, sloikDescription);
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
    `<div>
      <nav>
      <a id="sloik_${numberOfChildren}" class="sloikNavigation"
      href="/public/sloik.html" onclick="getSloikID(${numberOfChildren});">
      ${sloikTitle} Sloik</a>
      </nav>
    </div>`
  );
}

function renderExistingSloiks() {
  let sloikCounter = Cookies.get("sloiksCounter");
  const sloiksList = document.getElementById("sloiksList");
  for (let i = 0; i < sloikCounter; i++) {
    sloiksList.insertAdjacentHTML(
      "beforeend",
      `<div>
      <nav>
      <a id="sloik_${i}" class="sloikNavigation"
      href="/public/sloik.html" onclick="getSloikID(${i});">
      ${JSON.parse(Cookies.get(`sloikTitle_${i}`))} Sloik</a>
      </nav>
    </div>`
    );
  }
}

function getSloikID(sloikNumber) {
  sloikID = sloikNumber;
  localStorage.setItem("currentSloikID", JSON.stringify(sloikID));
}

export { renderExistingSloiks, addSloikData };
