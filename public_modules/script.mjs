import { renderExistingSloiks, addNewSloik } from "./modules/home/sloikGeneration.mjs";
import { showPopup, hidePopup } from "./modules/home/popup.mjs";
import { getData, addMoney, renderEditInputButtons } from "./modules/sloik/insideSloik.mjs";
import { renderAchievements } from "./modules/achievements/achievements.mjs";
import { editBtnSvg } from "./const/editSvg.mjs";
import {
  addSloikBtn,
  cancelCreateSloikBtn,
  submitPopupBtn,
  addMoneyBtn,
  editGoalBtn,
  editTitleBtn,
  editDescriptionBtn,
} from "./const/locators.mjs";

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

if (document.title == "SloikApp Home") {
  addSloikBtn.onclick = function () {
    showPopup();
  };
  cancelCreateSloikBtn.onclick = function () {
    hidePopup();
  };
}

if (document.title == "SloikApp Home") {
  submitPopupBtn.onclick = function () {
    if (document.title == "SloikApp Home") {
      addNewSloik();
    }
  };
}

if (document.title == "SloikApp Sloik") {
  editTitleBtn.insertAdjacentHTML("beforeend", editBtnSvg);
  editTitleBtn.onclick = function () {
    const editTitle = "sloikTitle";
    renderEditInputButtons(editTitle);
  };
  editDescriptionBtn.insertAdjacentHTML("beforeend", editBtnSvg);
  editDescriptionBtn.onclick = function () {
    const editDescription = "sloikDescription";
    renderEditInputButtons(editDescription);
  };
  editGoalBtn.insertAdjacentHTML("beforeend", editBtnSvg);
  editGoalBtn.onclick = function () {
    const editGoal = "sloikGoal";
    renderEditInputButtons(editGoal);
  };
  addMoneyBtn.onclick = function () {
    addMoney();
  };
}
