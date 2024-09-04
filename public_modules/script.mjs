import { renderExistingSloiks, addNewSloik } from "./modules/sloikGeneration.mjs";
import { showPopup, hidePopup } from "./modules/popup.mjs";
import { getData, addMoney, renderEditInputButtons } from "./modules/insideSloik.mjs";
import { renderAchievements } from "./modules/achievements.mjs";
import { editBtnSvg } from "./modules/editSvg.mjs";

window.onload = function () {
  if (document.title == "SloikApp Home") {
    renderExistingSloiks();
  }
  if (document.title == "SloikApp Sloik") {
    getData();
  }
  if (document.title == "SloikApp Achievements") {
    renderAchievements();
  }
};

const addSloikBtn = document.getElementById("add_sloik");
const cancelCreateSloikBtn = document.getElementById("cancelBtn");
if (document.title == "SloikApp Home") {
  addSloikBtn.onclick = function () {
    showPopup();
  };
  cancelCreateSloikBtn.onclick = function () {
    hidePopup();
  };
}

if (document.title == "SloikApp Home") {
  const submitPopupBtn = document.getElementById("submitBtn");
  submitPopupBtn.onclick = function () {
    if (document.title == "SloikApp Home") {
      addNewSloik();
    }
  };
}

const addMoneyBtn = document.getElementById("addMoneyBtn");
const editGoalBtn = document.getElementById("sloikGoalEdit");
const editTitleBtn = document.getElementById("sloikTitleEdit");
const editDescriptionBtn = document.getElementById("sloikDescriptionEdit");

if (document.title == "SloikApp Sloik") {
  editTitleBtn.insertAdjacentHTML("beforeend", editBtnSvg);
  editDescriptionBtn.insertAdjacentHTML("beforeend", editBtnSvg);
  editGoalBtn.insertAdjacentHTML("beforeend", editBtnSvg);
  editTitleBtn.onclick = function () {
    const editTitle = "sloikTitle";
    renderEditInputButtons(editTitle);
  };
  editDescriptionBtn.onclick = function () {
    const editDescription = "sloikDescription";
    renderEditInputButtons(editDescription);
  };
  editGoalBtn.onclick = function () {
    const editGoal = "sloikGoal";
    renderEditInputButtons(editGoal);
  };
  addMoneyBtn.onclick = function () {
    addMoney();
  };
}
