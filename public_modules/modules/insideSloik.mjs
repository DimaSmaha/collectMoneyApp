import { showPopup, hidePopup } from "./popup.mjs";
import { Transactions } from "./transactionsClass.mjs";
import { addTransactionDIV, renderTransactions } from "./transactions.mjs";
import {
  removeEditGoalElementsDisplay,
  setEditGoalBtnDisplay,
} from "./editGoal.mjs";
import { checkAchievements } from "./achievements.mjs";

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
  document.getElementById("sloikTitle").textContent = JSON.parse(
    Cookies.get(`sloikTitle_${sloikNumber}`)
  );
  document.getElementById("sloikDescription").textContent = JSON.parse(
    Cookies.get(`sloikDescription_${sloikNumber}`)
  );
  goalValue = parseInt(JSON.parse(Cookies.get(`goalValue_${sloikNumber}`)));
  isGoalReached = JSON.parse(Cookies.get(`isGoalReached_${sloikNumber}`));
  transactionsArray = JSON.parse(
    Cookies.get(`transactionsList_${sloikNumber}`)
  );
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
  let userGoal = document.getElementById("yourGoal");
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
  Cookies.set(`sloikTitle_${sloikID}`, JSON.stringify(sloikTitle.textContent), {
    expires: 365,
  });
  Cookies.set(
    `sloikDescription_${sloikID}`,
    JSON.stringify(sloikDescription.textContent),
    { expires: 365 }
  );
  Cookies.set(`totalMoney_${sloikID}`, JSON.stringify(totalMoney), {
    expires: 365,
  });
  Cookies.set(`goalValue_${sloikID}`, JSON.stringify(goalValue), {
    expires: 365,
  });
  Cookies.set(`isGoalReached_${sloikID}`, JSON.stringify(isGoalReached), {
    expires: 365,
  });
  Cookies.set(
    `transactionsList_${sloikID}`,
    JSON.stringify(transactionsArray),
    {
      expires: 365,
    }
  );
}
function updateCookieByName(sloikID, cookieName, cookieValue) {
  Cookies.set(`${cookieName}_${sloikID}`, JSON.stringify(`${cookieValue}`), {
    expires: 365,
  });
}

function recalculateMoneyScore() {
  totalMoney = 0;
  for (let i = 0; i < transactionsArray.length; i++) {
    totalMoney += transactionsArray[i].transactionSum;
  }
}

function addMoney() {
  const errorNegative = document.getElementById("errorNegativeNumber");
  const errorNotNumber = document.getElementById("errorNotNumber");
  const moneyInput = document.getElementById("addMoneyInput");
  const addedMoney = moneyInput.value;
  const moneyToBeAdded = parseInt(addedMoney);
  if (isNaN(moneyToBeAdded)) {
    moneyInput.value = "";
    errorNotNumber.style.display = "flex";
    return setTimeout(function () {
      errorNotNumber.style.display = "none";
    }, 2000);
  }
  if (moneyToBeAdded <= 0) {
    moneyInput.value = "";
    errorNegative.style.display = "flex";
    return setTimeout(function () {
      errorNegative.style.display = "none";
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
      alert(
        "Congrats you have reached your goal, you have made a great job. I'm proud of you 💚"
      );
    }, 500);
    isGoalReached = true;
  }
}

function formArray(addedMoney) {
  transactionsArray.push(
    JSON.parse(JSON.stringify(new Transactions(addedMoney)))
  );
  updateCookies(sloikID);
  console.log(transactionsArray);
}

function acceptEditGoal() {
  const editGoalInput = document.getElementById("editGoalInput");
  const editedGoal = parseInt(editGoalInput.value);
  if (isNaN(editedGoal) == false && editedGoal > 0) {
    goalValue = editedGoal;
    removeEditGoalElementsDisplay();
    setEditGoalBtnDisplay("flex");
    setProgressBar();
    setGoal();
    updateCookies(sloikID);
  }
  editGoalInput.value = "";
}

function deleteTransaction(transaction_id) {
  const transactionBox = document.getElementById(
    `transaction_${transaction_id}_Box`
  );
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
  const transactionEditInput = document.getElementById(
    `editMoneyInput_${transaction_id}`
  );
  const editedSum = parseInt(transactionEditInput.value);
  if (isNaN(editedSum) == false && editedSum > 0) {
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
  const commendationBox = document.getElementById("commendationPopup");
  const commendationMainBox = document.getElementById("commendationBox");

  if (
    (transactionsArray[transactionsArray.length - 1].transactionSum /
      goalValue) *
      100 >=
      5 ||
    transactionsArray[transactionsArray.length - 1].transactionSum >= 1000
  ) {
    let numberOfTransactionsToDo = Math.ceil(
      (goalValue - totalMoney) /
        transactionsArray[transactionsArray.length - 1].transactionSum
    );
    commendationBox.innerHTML = `Great job! If you make <b>${numberOfTransactionsToDo}</b> you will achieve your goal. Keep going`;
    commendationBox.style.display = "block";
  }
  setTimeout(() => {
    commendationBox.remove();
    commendationMainBox.insertAdjacentHTML(
      "beforeend",
      `<div id="commendationPopup"></div>`
    );
  }, 3100);
}

function renderEditInputButtons(box) {
  const getBox = document.getElementById(`${box}Box`);
  const getEditButton = document.getElementById(`${box}Edit`);
  getEditButton.style.display = "none";
  getBox.insertAdjacentHTML(
    "beforeEnd",
    `<input class="genericInput"id=${box}Input placeholder="edit"></input>
     <button class="genericAcceptBtn" id=${box}Accept><b>V</b></button>
     <button class="genericCancelBtn" id="${box}Cancel"><b>X</b></button`
  );
  renderActions(box);
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
    getBox.textContent = getInput.value;
    getCancelButton.remove();
    getAcceptButton.remove();
    getInput.remove();
    getEditButton.style.display = "inline-block";
    updateCookieByName(sloikID, box, getBox.textContent);
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
