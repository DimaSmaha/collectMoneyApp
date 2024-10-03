import loc from "./const/locators.mjs";
import { renderExistingSloiks, addNewSloik } from "./modules/home/sloikGeneration.mjs";
import { showPopup, hidePopup } from "./modules/home/popup.mjs";
import { getData, addMoney, renderEditInputButtons } from "./modules/sloik/insideSloik.mjs";
import { renderAchievements } from "./modules/achievements/achievements.mjs";
import { editBtnSvg } from "./const/editSvg.mjs";

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
  loc.addSloikBtn.onclick = function () {
    showPopup();
  };
  loc.cancelCreateSloikBtn.onclick = function () {
    hidePopup();
  };

  loc.submitPopupBtn.onclick = function () {
    if (document.title == "SloikApp Home") {
      addNewSloik();
    }
  };
}

if (document.title == "SloikApp Sloik") {
  loc.editTitleBtn.insertAdjacentHTML("beforeend", editBtnSvg);
  loc.editTitleBtn.onclick = function () {
    const editTitle = "sloikTitle";
    renderEditInputButtons(editTitle);
  };

  loc.editDescriptionBtn.insertAdjacentHTML("beforeend", editBtnSvg);
  loc.editDescriptionBtn.onclick = function () {
    const editDescription = "sloikDescription";
    renderEditInputButtons(editDescription);
  };

  loc.editGoalBtn.insertAdjacentHTML("beforeend", editBtnSvg);
  loc.editGoalBtn.onclick = function () {
    const editGoal = "sloikGoal";
    renderEditInputButtons(editGoal);
  };

  loc.addMoneyBtn.onclick = function () {
    addMoney();
  };
}
