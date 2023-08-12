import {
  renderExistingSloiks,
  addSloikData,
} from "./modules/sloikGeneration.mjs";
import { showPopup, hidePopup } from "./modules/popup.mjs";
import { getData } from "./modules/insideSloik.mjs";

window.onload = function () {
  if (document.title == "SloikApp Home") {
    renderExistingSloiks();
  }
  if (document.title == "SloikApp Sloik") {
    getData();
  }
};

const addSloikBtn = document.getElementById("add_sloik");
if (document.title == "SloikApp Home") {
  addSloikBtn.onclick = function () {
    showPopup();
  };
}

let totalMoney = 0;
let isGoalReached = false;
let transactionsArray = [];
const submitPopupBtn = document.getElementById("submitBtn");
submitPopupBtn.onclick = function () {
  if (document.title == "SloikApp Home") {
    addSloikData(totalMoney, isGoalReached, transactionsArray);
  }
};
