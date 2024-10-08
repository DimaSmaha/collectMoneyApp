import { showPopup, hidePopup } from "../home/popup.mjs";
import { Transactions } from "./transactionsClass.mjs";
import { addTransactionDIV, renderTransactions } from "./transactions.mjs";
import { checkAchievements } from "../achievements/achievements.mjs";
import { numberRegExp, stringRegExp } from "../../const/regExp.mjs";
import { getCookie, setCookie } from "../cookies/cookies.mjs";

let sloikID;
sloikID = localStorage.getItem("currentSloikID");
let totalMoney = 0;
let goalValue = 0;
let isGoalReached = false;
let transactionsArray = [];

const getData = async () => {
  // removeCookies();
  // setTestingCookies();
  if (document.cookie.length != 0) {
    getCookiesByID(sloikID);
  }
  if (transactionsArray != null) {
    for (let i = 0; i < transactionsArray.length; i++) {
      totalMoney += transactionsArray[i].transactionSum;
    }
  }
  checkTitleDescriptionAndGoalExistence();
  checkGoalSumExistence();
  changeMoneyScore();
  if (goalValue > 0) {
    setGoal();
  }
  renderTransactions(transactionsArray);
  setProgressBar();
  showRandomCommendation();
  console.log(transactionsArray);
  updateCookies(sloikID);
  checkAchievements(transactionsArray);
};

function getCookiesByID(sloikNumber) {
  document.getElementById("sloikTitle").textContent = getCookie(`sloikTitle_${sloikNumber}`);
  document.getElementById("sloikDescription").textContent = getCookie(
    `sloikDescription_${sloikNumber}`,
  );
  goalValue = parseInt(getCookie(`goalValue_${sloikNumber}`));
  isGoalReached = getCookie(`isGoalReached_${sloikNumber}`);
  transactionsArray = getCookie(`transactionsList_${sloikNumber}`);
  return goalValue, isGoalReached, transactionsArray;
}

function checkTitleDescriptionAndGoalExistence() {
  const sloikTitle = document.getElementById("sloikTitle");
  const sloikDescription = document.getElementById("sloikDescription");
  if (
    sloikTitle.textContent.trim().length == 0 ||
    sloikDescription.textContent.trim().length == 0
  ) {
    showPopup();
  }
}

function checkGoalSumExistence() {
  const goalSumInput = document.getElementById("inputField3");
  if (goalValue != 0 || goalValue == undefined) {
    goalSumInput.remove();
  }
}

function changeMoneyScore() {
  let yourMoneyScore = document.getElementById("yourMoneyScore");
  let sentence = `Your money : ${totalMoney}`;
  yourMoneyScore.textContent = sentence;
}

function getGoal() {
  const goalSumValue = parseInt(document.getElementById("inputField3").value);
  goalValue = goalSumValue;
  return goalValue;
}

function setGoal() {
  let userGoal = document.getElementById("sloikGoal");
  if (goalValue == 0 || goalValue == undefined || goalValue == null) {
    goalValue = getGoal();
    updateCookies(sloikID);
  }
  let sentence = `Your goal : ${goalValue}`;
  userGoal.textContent = sentence;
}

function setProgressBar() {
  const progressBar = document.getElementById("progressBar");
  const progressBarText = document.getElementById("progressBarText");
  const progressBarPercentage = (totalMoney / goalValue) * 100;
  if (totalMoney <= goalValue) {
    progressBar.style.width = `${progressBarPercentage}%`;
    progressBarText.textContent = `${Math.round(progressBarPercentage)}%`;
  }
  if (totalMoney >= goalValue) {
    progressBar.style.width = "100%";
    progressBarText.textContent = `${Math.round(progressBarPercentage)}%`;
  }
}

function showRandomCommendation() {
  const commendation = document.getElementById("commendation");
  const commendationText = document.getElementById("commendation_text");
  const commendationsList = [
    "Your dedication to collecting money is commendable.",
    "I admire your perseverance despite the challenges.",
    "I'm impressed by your perseverance despite the challenges.",
    "Patient and determined in saving for the future.",
    "Your commitment to your goals is inspiring.",
    "Inspiring others with your saving habits.",
    "Keep pushing forward - your efforts will pay off.",
    "Your efforts are making a difference, keep going!",
    "Setting a great example of financial wisdom.",
    "You've got this! Stay focused and stay positive.",
  ];
  let getRandomChar = Math.floor(Math.random() * commendationsList.length);
  commendation.style.display = "block";
  commendationText.textContent = commendationsList[getRandomChar];
  if (transactionsArray.length == 0) {
    commendation.style.display = "none";
  }
  if (transactionsArray.length == 1) {
    commendation.style.display = "block";
    commendationText.textContent =
      "Its your first transaction. Great job you have started your journey";
  }
}

function updateCookies(sloikID) {
  const sloikTitle = document.getElementById("sloikTitle");
  const sloikDescription = document.getElementById("sloikDescription");
  setCookie(`sloikTitle_${sloikID}`, sloikTitle.textContent);
  setCookie(`sloikDescription_${sloikID}`, sloikDescription.textContent);
  setCookie(`totalMoney_${sloikID}`, totalMoney);
  setCookie(`goalValue_${sloikID}`, goalValue);
  setCookie(`isGoalReached_${sloikID}`, isGoalReached);
  setCookie(`transactionsList_${sloikID}`, transactionsArray);
}
function updateCookieByName(sloikID, cookieName, cookieValue) {
  setCookie(`${cookieName}_${sloikID}`, `${cookieValue}`);
}

function recalculateMoneyScore() {
  totalMoney = 0;
  for (let i = 0; i < transactionsArray.length; i++) {
    totalMoney += transactionsArray[i].transactionSum;
  }
}

function addMoney() {
  const errorNotNumber = document.getElementById("errorNotNumber");
  const moneyInput = document.getElementById("addMoneyInput");
  const addedMoney = moneyInput.value;
  const moneyToBeAdded = parseInt(addedMoney);
  if (!numberRegExp.test(moneyToBeAdded) || moneyToBeAdded < 1) {
    moneyInput.value = "";
    errorNotNumber.style.display = "flex";
    return setTimeout(function () {
      errorNotNumber.style.display = "none";
    }, 2000);
  }
  totalMoney += moneyToBeAdded;
  console.log(totalMoney);
  moneyInput.value = "";
  // updateJSONFile();
  changeMoneyScore();
  formArray(moneyToBeAdded);
  if (totalMoney < goalValue || !isGoalReached) {
    checkGoal();
  }
  addTransactionDIV(transactionsArray);
  setProgressBar();
  checkAchievements(transactionsArray);
  showRandomCommendation();
  updateCookies(sloikID);
  showHowMuchSameTransactionsUserNeed();
  return totalMoney;
}

function checkGoal() {
  if (totalMoney >= goalValue) {
    setTimeout(function () {
      alert("Congrats you have reached your goal, you have made a great job. I'm proud of you 💚");
    }, 500);
    isGoalReached = true;
  }
}

function formArray(addedMoney) {
  transactionsArray.push(JSON.parse(JSON.stringify(new Transactions(addedMoney))));
  updateCookies(sloikID);
  console.log(transactionsArray);
}

function acceptEditGoal() {}

function deleteTransaction(transaction_id) {
  const transactionBox = document.getElementById(`transaction_${transaction_id}_Box`);
  transactionBox.remove();
  totalMoney -= transactionsArray[transaction_id].transactionSum;
  changeMoneyScore();
  transactionsArray.splice(transaction_id, 1);
  const transactionBoxes = document.getElementById("transactionBoxes");
  transactionBoxes.replaceChildren();
  renderTransactions(transactionsArray);
  setProgressBar();
  updateCookies(sloikID);
  console.log(transactionsArray);
}

function acceptEditTransaction(transaction_id) {
  const transactionEditInput = document.getElementById(`editMoneyInput_${transaction_id}`);
  const editedSum = parseInt(transactionEditInput.value);
  if (numberRegExp.test(editedSum) && editedSum > 0) {
    transactionsArray[transaction_id].transactionSum = editedSum;
    const transactionBoxes = document.getElementById("transactionBoxes");
    transactionBoxes.replaceChildren();
    renderTransactions(transactionsArray);
    recalculateMoneyScore();
    changeMoneyScore();
    setProgressBar();
    updateCookies(sloikID);
    if (totalMoney < goalValue || !isGoalReached) {
      checkGoal();
    }
    if (totalMoney < goalValue) {
      isGoalReached = false;
    }
  }
  transactionEditInput.value = "";
}

function showHowMuchSameTransactionsUserNeed() {
  const commendationMainBox = document.getElementById("commendationBox");

  if (isGoalReached) {
    return;
  }

  if (
    (transactionsArray[transactionsArray.length - 1].transactionSum / goalValue) * 100 >= 5 ||
    transactionsArray[transactionsArray.length - 1].transactionSum >= 1000
  ) {
    commendationMainBox.insertAdjacentHTML("beforeend", `<div id="commendationPopup"></div>`);
    const commendationBox = document.getElementById("commendationPopup");

    let numberOfTransactionsToDo = Math.ceil(
      (goalValue - totalMoney) / transactionsArray[transactionsArray.length - 1].transactionSum,
    );
    commendationBox.innerHTML = `Great job! You will achieve your goal if you make <b>${numberOfTransactionsToDo}</b> more of the same transactions. Keep going`;
    commendationBox.style.display = "block";

    setTimeout(() => {
      commendationBox.remove();
    }, 8000);
  }
}

function renderEditInputButtons(box) {
  const getBox = document.getElementById(`${box}Box`);
  const getEditButton = document.getElementById(`${box}Edit`);
  getEditButton.style.display = "none";
  getBox.insertAdjacentHTML(
    "beforeEnd",
    `<input class="genericInput"id=${box}Input placeholder="edit"></input>
     <button class="genericAcceptBtn" id=${box}Accept><b>V</b></button>
     <button class="genericCancelBtn" id="${box}Cancel"><b>X</b></button`,
  );
  if (box == "sloikGoal") {
    renderGoalActions(box);
  }
  if (box !== "sloikGoal") {
    renderActions(box);
  }
}

function renderActions(box) {
  const getBox = document.getElementById(`${box}`);
  const getAcceptButton = document.getElementById(`${box}Accept`);
  const getCancelButton = document.getElementById(`${box}Cancel`);
  const getInput = document.getElementById(`${box}Input`);
  const getEditButton = document.getElementById(`${box}Edit`);

  getCancelButton.onclick = function () {
    getCancelButton.remove();
    getAcceptButton.remove();
    getInput.remove();
    getEditButton.style.display = "inline-block";
  };

  getAcceptButton.onclick = function () {
    if (stringRegExp.test(getInput.value)) {
      getBox.textContent = getInput.value;
      getCancelButton.remove();
      getAcceptButton.remove();
      getInput.remove();
      getEditButton.style.display = "inline-block";
      updateCookieByName(sloikID, box, getBox.textContent);
    }
  };
}

function renderGoalActions(box) {
  const getBox = document.getElementById(`${box}`);
  const getAcceptButton = document.getElementById(`${box}Accept`);
  const getCancelButton = document.getElementById(`${box}Cancel`);
  const getInput = document.getElementById(`${box}Input`);
  const getEditButton = document.getElementById(`${box}Edit`);
  getInput.type = "number";

  getCancelButton.onclick = function () {
    getCancelButton.remove();
    getAcceptButton.remove();
    getInput.remove();
    getEditButton.style.display = "inline-block";
  };

  getAcceptButton.onclick = function () {
    const editedGoal = parseInt(getInput.value);
    if (numberRegExp.test(editedGoal) && editedGoal > 0) {
      goalValue = editedGoal;
      getCancelButton.remove();
      getAcceptButton.remove();
      getInput.remove();
      getEditButton.style.display = "inline-block";
      setProgressBar();
      setGoal();
      updateCookies(sloikID);
    }
    getInput.value = "";
  };
}

export {
  getData,
  addMoney,
  acceptEditGoal,
  deleteTransaction,
  acceptEditTransaction,
  renderEditInputButtons,
};
