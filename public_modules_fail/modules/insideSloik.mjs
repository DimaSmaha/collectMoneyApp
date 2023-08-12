let sloikID;
sloikID = localStorage.getItem("currentSloikID");

const getData = async () => {
  // removeCookies();
  // setTestingCookies();
  if (document.cookie.length != 0) {
    getCookiesByID(sloikID);
  }
  if (transactionsArray != null) {
    for (i = 0; i < transactionsArray.length; i++) {
      totalMoney += transactionsArray[i].transactionSum;
    }
  }
  checkTitleDescriptionAndGoalExistence();
  checkGoalSumExistence();
  changeMoneyScore();
  if (goalValue > 0) {
    setGoal();
  }
  renderTransactions();
  setProgressBar();
  showRandomCommendation();
  console.log(transactionsArray);
  updateCookies(sloikID);
};

function getCookiesByID(sloikNumber) {
  document.getElementById("sloikTitle").textContent = JSON.parse(
    Cookies.get(`sloikTitle_${sloikNumber}`)
  );
  document.getElementById("sloikDescription").textContent = JSON.parse(
    Cookies.get(`sloikDescription_${sloikNumber}`)
  );
  goalValue = JSON.parse(Cookies.get(`goalValue_${sloikNumber}`));
  isGoalReached = JSON.parse(Cookies.get(`isGoalReached_${sloikNumber}`));
  transactionsArray = JSON.parse(
    Cookies.get(`transactionsList_${sloikNumber}`)
  );
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
