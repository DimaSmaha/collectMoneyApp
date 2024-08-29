import {
  renderExistingSloiks,
  addSloikData,
} from "./modules/sloikGeneration.mjs";
import { showPopup, hidePopup } from "./modules/popup.mjs";
import {
  getData,
  addMoney,
  acceptEditGoal,
  renderEditInputButtons,
  deleteTransaction,
} from "./modules/insideSloik.mjs";
import {
  editGoal,
  setEditGoalBtnDisplay,
  removeEditGoalElementsDisplay,
} from "./modules/editGoal.mjs";
import { renderAchievements } from "./modules/achievements.mjs";

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

let totalMoney = 0;
let isGoalReached = false;
let transactionsArray = [];
if (document.title == "SloikApp Home") {
  const submitPopupBtn = document.getElementById("submitBtn");
  submitPopupBtn.onclick = function () {
    if (document.title == "SloikApp Home") {
      addSloikData(totalMoney, isGoalReached, transactionsArray);
    }
  };
}

const addMoneyBtn = document.getElementById("addMoneyBtn");
const editGoalBtn = document.getElementById("edit_goal_button");
const editTitleBtn = document.getElementById("sloikTitleEdit");
const editDescriptionBtn = document.getElementById("sloikDescriptionEdit");

if (document.title == "SloikApp Sloik") {
  editTitleBtn.onclick = function () {
    const editTitle = "sloikTitle";
    renderEditInputButtons(editTitle);
  };
  editDescriptionBtn.onclick = function () {
    const editDescription = "sloikDescription";
    renderEditInputButtons(editDescription);
  };
  addMoneyBtn.onclick = function () {
    addMoney();
  };
  editGoalBtn.onclick = function () {
    editGoal();
    if (editGoalBtn.style.display == "none") {
      const cancelEditGoalBtn = document.getElementById("cancel_edit_goal");
      const acceptEditGoalBtn = document.getElementById("accept_edit_goal");
      cancelEditGoalBtn.onclick = function () {
        setEditGoalBtnDisplay("flex");
        removeEditGoalElementsDisplay();
      };
      acceptEditGoalBtn.onclick = function () {
        acceptEditGoal();
      };
    }
  };
}
